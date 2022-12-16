import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { useCounter, useDebouncedState, useDisclosure, useInputState } from "@mantine/hooks";
import { useState } from "react";



const Contoh = () => {
    const [val, setVal] = useInputState("")
    
    return <>
      <TextInput onChange={setVal}  />
    
      {val}
    </>
}

export default Contoh



