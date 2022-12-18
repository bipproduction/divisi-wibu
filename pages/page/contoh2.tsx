import { Group, TextInput, Box, Text, Code, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { useRef, useState } from 'react';
import { useShallowEffect } from '@mantine/hooks';

function Contoh2() {
    const [sudah, setSudah] = useState(false)
    const [diangakat, setDiangkat] = useState(false)
    const refnya = useRef(false)
    const form = useForm({
        initialValues: {
            employees: [
                { name: 'John Doe', email: 'john@mantine.dev' },
                { name: 'Bill Love', email: 'bill@mantine.dev' },
                { name: 'Nancy Eagle', email: 'nanacy@mantine.dev' },
                { name: 'Lim Notch', email: 'lim@mantine.dev' },
                { name: 'Susan Seven', email: 'susan@mantine.dev' },
            ],
        },
    });

    useShallowEffect(() => {
        if (!refnya.current) {

        } else {
            setSudah(true)
        }
    }, [])

    // const fields = form.values.employees.map((_, index) => (
    //     <Draggable
    //         key={index}
    //         index={index}
    //         draggableId={index.toString()}>
    //         {(provided) => (
    //             <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
    //                 <Center {...provided.dragHandleProps}>
    //                     <IconGripVertical size={18} />
    //                 </Center>
    //                 <TextInput placeholder="John Doe" {...form.getInputProps(`employees.${index}.name`)} />

    //             </Group>
    //         )}
    //     </Draggable>
    // ));

    return (
        <>
            <Box ref={refnya as any} >

            </Box>
            {sudah && <Box sx={{ maxWidth: 500 }} mx={"auto"}>
                <DragDropContext
                    onDragUpdate={(apa) => console.log(apa.destination) }
                    onDragEnd={({ destination, source }) => {
                        if (destination && source) {
                            form.reorderListItem("employees", { from: source!.index, to: destination!.index })
                        }
                    }}
                >
                    <Droppable key={"satu"} droppableId={"satu"} direction={"vertical"}>
                        {(provided) => (
                            <Box {...provided.droppableProps} ref={provided.innerRef}>
                                {form.values.employees.map((d, i) =>
                                    <Draggable
                                        key={i}
                                        index={i}
                                        draggableId={i.toString()}>
                                        {(prof) => (
                                            <Box ref={prof.innerRef} {...prof.draggableProps} {...prof.dragHandleProps}>
                                                <Text>halo {d.name}</Text>

                                            </Box>
                                        )}
                                    </Draggable>)}
                                {provided.placeholder}
                            </Box>

                        )}
                    </Droppable>

                </DragDropContext>
            </Box>}
            {/* {sudah && <Box sx={{ maxWidth: 500 }} mx="auto">
                <DragDropContext
                    onDragEnd={({ destination, source, }) =>
                        form.reorderListItem('employees', { from: source.index, to: destination!.index })
                    }
                >
                    <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {fields}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>} */}
        </>
    );
}

export default Contoh2;