import { ActionIcon, Box, Card, Divider, Grid, Group, ScrollArea, Space, Stack, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useShallowEffect } from "@mantine/hooks"
import { useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import _ from "lodash"
import { v4 } from "uuid"
import { IconClockPause, IconX } from "@tabler/icons"

interface Sembarang {
    [key: string]: any
}


const listUser = [
    {
        id: v4(),
        name: "malik",
        value: "malik"
    },
    {
        id: v4(),
        name: "bagas",
        value: "malik"
    },
    {
        id: v4(),
        name: "lukman",
        value: "malik"
    },
    {
        id: v4(),
        name: "alit",
        value: "malik"
    }
]

const listData = {
    satu: [
        {
            id: v4(),
            name: "11",
            value: "11",
        },

    ],
    dua: [
        {
            id: v4(),
            name: "21",
            value: "21",
        },
        {
            id: v4(),
            name: "22",
            value: "22",
        },

    ],
    tiga: [
        {
            id: v4(),
            name: "31",
            value: "31",
        },
        {
            id: v4(),
            name: "32",
            value: "32",
        },
        {
            id: v4(),
            name: "33",
            value: "33",
        }
    ]
}


const Contoh3 = () => {
    const refok = useRef(false)
    const [ok, setok] = useState(false)

    const formData = useForm<Sembarang>();
    const [diangkat, setDiangkat] = useState(false)
    const [lsUser, setlsUser] = useState<any[]>([])
    const [isDisable, setIsDisable] = useState(false)

    useShallowEffect(() => {
        if (!refok.current) {

        } else {
            setok(true)
        }
    }, [])

    useShallowEffect(() => {
        formData.setValues(listData)
    }, [])

    useShallowEffect(() => {
        setlsUser(listUser)
    }, [])

    return (<>
        <div ref={refok as any}></div>
        {ok && (<DragDropContext
            onDragUpdate={({ source, destination, }, b) => {
                setDiangkat(true)
                if (source && source.droppableId && destination && destination.droppableId) {
                    const dataHasil = { ...formData.values }
                    const arrSource: any[] = dataHasil[source.droppableId as keyof {}]
                    const arrDes: any[] = dataHasil[destination!.droppableId as keyof {}]

                    const sumberData = { ...lsUser[source.index] }
                    if (arrDes && arrDes.map(e => e.name).includes(sumberData.name)) {
                        setIsDisable(true)
                    } else {
                        setIsDisable(false)
                    }
                }
            }}
            onDragEnd={({ source, destination }) => {
                setIsDisable(true)
                setDiangkat(false)
                if (source.droppableId && destination && destination.droppableId) {
                    const dataHasil = { ...formData.values }
                    const arrSource: any[] = dataHasil[source.droppableId as keyof {}]
                    const arrDes: any[] = dataHasil[destination!.droppableId as keyof {}]

                    if (destination && destination.droppableId == "sumber") {
                        return
                    }

                    if (source.droppableId === "sumber") {

                        const sumberData = { ...lsUser[source.index] }
                        sumberData.id = v4()

                        if (!arrDes.map(e => e.name).includes(sumberData.name)) {
                            arrDes.splice(destination.index, 0, sumberData)
                        }

                        return
                    }


                    if (source.droppableId === destination.droppableId) {

                        const [ell] = arrSource.splice(source.index, 1)
                        arrDes.splice(destination.index, 0, ell)
                    } else {

                        const [ell] = arrSource.splice(source.index, 1)
                        arrDes.splice(destination.index, 0, ell)

                        console.log(dataHasil)
                    }
                }

            }}>
            <ScrollArea p={"xs"} h={500}>
                <Card
                    w={200}
                    bg={"gray.2"}>
                    <Droppable isDropDisabled={true}
                        droppableId={"sumber"} >
                        {(prov0) => <Box
                            {...prov0.droppableProps}
                            ref={prov0.innerRef}>
                            <ScrollArea>
                                {lsUser!.map((e, i) =>
                                    <Draggable
                                        key={e.id}
                                        index={i}
                                        draggableId={e.id}>
                                        {(prov00) => <Box
                                            {...prov00.draggableProps}
                                            {...prov00.dragHandleProps}
                                            ref={prov00.innerRef}
                                            mb={"xs"}>
                                            <Card
                                                bg={"gray.0"}
                                                p={"xs"}>
                                                <Text>{e.name}</Text>
                                                <Text>{i}</Text>
                                                <Divider />
                                                <Text>{e.id}</Text>
                                            </Card>
                                        </Box>}
                                    </Draggable>)}
                            </ScrollArea>
                            {prov0.placeholder}
                        </Box>
                        }
                    </Droppable>
                </Card>
            </ScrollArea>
            <Space h={100} />
            <Group p={"xs"}>
                {Object.keys(formData.values).map(e =>
                    <Card
                        key={e}
                        p={"xs"}
                        h={500}
                        bg={"cyan"}
                        w={300}>
                        <Text c={"white"} weight={"bold"}>{e}</Text>
                        <Droppable droppableId={e}  >
                            {(prov1) => (<Box
                                bg={diangkat ? "cyan.7" : ""}
                                {...prov1.droppableProps}
                                ref={prov1.innerRef} >
                                {[...formData.values[e as keyof {}] as any[]].map((v, k) =>
                                    <Box key={v.id}>
                                        <Draggable
                                            key={v.id}
                                            index={k}
                                            draggableId={v.id}>
                                            {(prov2) => <Card
                                                {...prov2.draggableProps}
                                                {...prov2.dragHandleProps}
                                                ref={prov2.innerRef}
                                                p={"xs"}
                                                mt={"xs"}
                                                bg={"white"}
                                            >
                                                <Grid>
                                                    <Grid.Col span={"auto"}>
                                                        <Text c={"gray.8"}>{v.name}</Text>
                                                        <Text>{k}</Text>
                                                        <Divider />
                                                        <Text>{v.id}</Text>
                                                    </Grid.Col>
                                                    <Grid.Col span={"content"}>
                                                        <ActionIcon onClick={() => {
                                                            let arrNya: any[] = [...formData.values[e as keyof {}]]
                                                            arrNya.splice(k, 1)
                                                            formData.setFieldValue(e, arrNya)

                                                            console.log(arrNya)
                                                        }}>
                                                            <IconX />
                                                        </ActionIcon>
                                                    </Grid.Col>
                                                </Grid>
                                            </Card>}
                                        </Draggable>

                                    </Box>)}
                                {prov1.placeholder}
                            </Box>)}
                        </Droppable>
                    </Card>)}
            </Group>
        </DragDropContext>)}
    </>)
}

export default Contoh3