import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Box, Button, Divider, Stack, Text } from '@mantine/core';
import { PropsWithChildren, useState } from 'react';
import { SortableContext } from '@dnd-kit/sortable';

const Contoh = () => {

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  const containers = [1, 2, 3, 4, 5];
  const [isi, setIsi] = useState<number[]>([]);
  const [idNya, setIdnya] = useState<number>();

  const markup = (id: number, key: number) => <Draggable id={id} key={id} >halo ini siapa {id}</Draggable>

  return <>
    {JSON.stringify(containers)}
    <Divider />
    {JSON.stringify(isi)}
    <DndContext onDragEnd={handleDragEnd} onDragStart={(ini) => setIdnya(ini.active.id as any)}>
      {containers.map(e => !isi.includes(e) && markup(e, e))}

      <Stack>
        {containers.map(ee => <Droppable key={ee} id={ee}>
          {isi.includes(ee) && markup(ee, ee)}
        </Droppable>)}
      </Stack>

    </DndContext>
  </>

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event


    // let datanya: number[] = [...isi]
    // let idx: number = over!.id as number
    // datanya[idx] = over!.id as number
  }
}

interface DragId {
  id: number;
}

function Draggable(props: PropsWithChildren & DragId) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform && {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  }

  return (
    <div style={{ padding: 8 }}>
      <Button ref={setNodeRef} style={style!} {...listeners} {...attributes}>
        {props.children}
      </Button>
    </div>
  );
}


function Droppable(props: PropsWithChildren & DragId) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <>
      <Stack>
        <Text ref={setNodeRef} p={isOver ? "lg" : "xs"} bg={isOver ? "green" : "gray"}>
          {props.children}
        </Text>
      </Stack>
    </>
  );
}

export default Contoh



