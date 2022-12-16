import { Box, Button, Checkbox, Group, Input, Modal, MultiSelect, NumberInput, Select, SimpleGrid, Slider, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks"
import { DatePicker, DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { v4 } from "uuid";
import MyTaskProps from "../models/my_task_props";

interface AddTaskProps {
    dependencies: [],
    projectId: string,
    listTask: any[]
}

const AddTask = ({ dependencies, projectId, listTask }: AddTaskProps) => {
    const [open, setopen] = useDisclosure(false);
    const id = v4()
    const formNya = useForm({
        initialValues: {
            id: id,
            name: "",
            start: new Date(),
            end: new Date(),
            progress: 20,
            type: (listTask[0] ?? "") == "" ? "project" : "task",
            hideChildren: false,
            displayOrder: listTask.length + 1,
            project: (listTask[0] ?? "").id ?? "",
            dependencies: dependencies,
            isDisabled: false,
            projectId: projectId,
        }
    })

    const simpan = () => {

        fetch('/api/task-create', {
            method: "POST",
            body: JSON.stringify(formNya.values)
        }).then(async res => {
            if (res.status === 201) {
                const data = await res.text();
                console.log(data)
            }
        })

    }

    return (<>
        <Modal opened={open} title={"Add Task"} onClose={setopen.close}>
            <Stack spacing={"xs"}>
                <Input value={formNya.values.id} onChange={() => { }} />
                <TextInput label={"name Task"} placeholder="task name" value={formNya.values.name} {...formNya.getInputProps("name")} />
                <SimpleGrid cols={2}>
                    <DatePicker placeholder="select start" label={"start"} value={formNya.values.start} {...formNya.getInputProps("start")} />
                    <DatePicker placeholder="select end" label={"end"} value={formNya.values.start} {...formNya.getInputProps("end")} />
                </SimpleGrid>
                <Text>Progress</Text>
                <Slider label={(val) => `${val} %`} marks={[
                    { value: 20, label: '20%' },
                    { value: 50, label: '50%' },
                    { value: 80, label: '80%' },
                ]} value={formNya.values.progress} onChange={(val) => formNya.setFieldValue('progress', val)} />
                <Select placeholder="select type" label={"select type"} mt={"xs"} data={["project", "task", "milestone"]} value={formNya.values.type} {...formNya.getInputProps("type")} />
                <Checkbox label={"hide children"} value={formNya.values.hideChildren} {...formNya.getInputProps("hideChildren")} />
                {/* <Select mt={"xs"} label={"display order"} placeholder={"select display order"} data={[...Array.from({ length: 200 }, (_, b) => (b + 1).toString())]} defaultValue={formNya.values.displayOrder} {...formNya.getInputProps("displayOrder")} /> */}
                <NumberInput max={200} min={1} value={formNya.values.displayOrder} {...formNya.getInputProps("displayOrder")} />
                <TextInput label={"project"} mt={"xs"} value={formNya.values.project} {...formNya.getInputProps("project")} />
                <MultiSelect label={"dependency"} data={listTask.length < 2 ? [] : listTask.map(itm => ({ value: itm.id, label: itm.name }))} {...formNya.getInputProps("dependencies")} />
                <Checkbox mt={"xs"} label={"is disable"} value={formNya.values.isDisabled} {...formNya.getInputProps("isDisabled")} />
                <Group position="right">
                    <Button onClick={simpan} >Save</Button>
                </Group>
            </Stack>

        </Modal>
        <Box p={"xs"}>
            <Button variant="white" onClick={setopen.open}  >
                Add Task
            </Button>
        </Box>
    </>)
}

export default AddTask