import { Box, Button, Group, Modal, MultiSelect, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import "gantt-task-react/dist/index.css";
import MyTask from "../component/my_task";
import { IconPlus } from "@tabler/icons"
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import AddProject from "../component/add_project";
import AddUser from "../component/add_user";
import { useState } from "react";
import AddTask from "../component/add_task";
import ProjectNya from "../models/model_project";


export default function Home() {
  const [listProject, setListProject] = useState<ProjectNya[]>([])

  useShallowEffect(() => {
    fetch('/api/project-list').then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        setListProject(data)
      }
    })

    return
  }, [])

  return (
    <>
      <Stack>
        <Group p={"xs"}>
          <AddProject />
          <AddUser />
        </Group>
        {listProject.map( item => <Box key={item.id}>
          <MyTask mainProject={item as any} />
        </Box>)}
      </Stack>


    </>
  )
}


{/* 
<Group p={"xs"}>
          <AddProject />
          <AddUser />
        </Group>
        <MyTask /> 
      */}