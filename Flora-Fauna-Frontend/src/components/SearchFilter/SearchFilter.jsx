import * as React from "react"
import { useState, useMemo } from "react"
import { Dropdown } from "@nextui-org/react";
import { useAuthContext } from "../../contexts/auth.jsx"
import { usePostContext } from "../../contexts/posts.jsx";
import './SearchFilter.css'

export default function App() {

  // NextUI Library for reference: https://nextui.org/
  // NextUI Dropdown component: https://nextui.org/docs/components/dropdown

  const [selectedTime, setSelectedTime] = useState(new Set(["time"]));
  const [selectedCat, setSelectedCat] = useState(new Set(["categories"]));
  const { setSelectedCategory } = usePostContext();
  // Value for Time dropdown
  const selectedValueTime = useMemo(
    () => Array.from(selectedTime).join(": ").replaceAll("_", " "),
    [selectedTime]
  );
  // Value for Category dropdown
  const selectedValueCat = useMemo(
    () => Array.from(selectedCat).join(": ").replaceAll("_", " "),
    [selectedCat]
  );

  setSelectedCategory(selectedCat)
  return (
    <div className="search-filter">

    {/* TIME DROPDOWN */}
      <Dropdown>
      <Dropdown.Button flat color="warning" css={{ tt: "capitalize" }}>
        {selectedValueTime}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="warning"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedTime}
        onSelectionChange={setSelectedTime}
      >
        <Dropdown.Item key="daily">Daily</Dropdown.Item>
        <Dropdown.Item key="weekly">Weekly</Dropdown.Item>
        <Dropdown.Item key="monthly">Monthly</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    {/* CATEGORY DROPDOWN */}
      <Dropdown>
        <Dropdown.Button flat color="warning" css={{ tt: "capitalize" }}>
          {selectedValueCat}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Multiple selection actions"
          color="warning"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedCat}
          onSelectionChange={setSelectedCat}
        >
          <Dropdown.Item key="plants">Plants</Dropdown.Item>
          <Dropdown.Item key="mammals">Mammals</Dropdown.Item>
          <Dropdown.Item key="insects">Insects</Dropdown.Item>
          <Dropdown.Item key="reptiles">Reptiles</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    
  );
}
