import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

const AddUser = () => {
    const [open, handler] = useDisclosure(false)
    const formNya = useForm({
        initialValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSave = () => {
        if (formNya.values.name == "") {
            showNotification({
                title: "info",
                message: "nama tidak boleh kosong"
            })

            return
        }
        fetch('/api/user-create', { method: "POST", body: JSON.stringify(formNya.values) }).then(res => {
            if (res.status === 201) {
                showNotification({
                    title: "Info",
                    message: "success"
                })

                handler.close()

            } else {
                showNotification({
                    title: "Info",
                    message: res.body!.toString()
                })
            }
        })
    }


    return (<>
        <Modal title={"Add user"} opened={open} onClose={handler.close}>
            <Stack>
                <TextInput placeholder="name" {...formNya.getInputProps("name")} />
                <TextInput placeholder="email" {...formNya.getInputProps("email")} />
                <TextInput placeholder="password" {...formNya.getInputProps("password")} />
                <Group position="right">
                    <Button onClick={onSave}>Simpan</Button>
                </Group>
            </Stack>
        </Modal>
        <Button variant="white" onClick={handler.open}>
            Add User
        </Button>
    </>)
}

export default AddUser;