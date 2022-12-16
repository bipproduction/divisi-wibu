import { Box, Button, Group, Modal, MultiSelect, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure, useShallowEffect } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons"
import { useState } from "react"

const AddProject = () => {
    const [open, handle] = useDisclosure(false)
    const [listUser, setLiistUser] = useState<{}[]>([]);

    const formnya = useForm({
        initialValues: {
            name: "",
            user: []
        }
    })

    useShallowEffect(() => {


        fetch('/api/user-get').then(async res => {
            if (res.status === 200) {
                const data = (await res.json() as []).map((itm: any) => ({ value: itm, label: itm.name }));
                setLiistUser(data)
            }
        })
    }, [])

    const simpan = () => {
        if (formnya.values.name == "" || formnya.values.user.length < 0) {
            showNotification({ title: "info", message: "isi semuanya dengan lengkap" })
            return
        }

        const dataUser = formnya.values.user.map((e: any) => ({ userId: e.id }))
        formnya.values.user = dataUser as any;
        fetch('/api/project-create', { method: "POST", body: JSON.stringify(formnya.values) }).then(res => {
            if (res.status === 201) {
                showNotification({ title: "info", message: "success" })
                handle.close()
            } else {
                showNotification({ title: "info", message: res.body!.toString() })
            }
        })
    }
    return (<>
        <Modal title={"Add New Project"} opened={open} onClose={handle.close} >

            {listUser.length > 0 && <Stack>
                <TextInput placeholder="name" {...formnya.getInputProps('name')} />
                <MultiSelect placeholder="select user" data={listUser} {...formnya.getInputProps('user')} />
                <Group position="right">
                    <Button onClick={simpan} >Simpan</Button>
                </Group>
            </Stack>}
        </Modal>
        <Button variant="white" onClick={handle.open} >
            Add Project
        </Button>
    </>)
}

export default AddProject