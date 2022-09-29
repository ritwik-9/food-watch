import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { ReactElement, useState } from "react";
import { Button, Platform, View } from "react-native";

interface DateInputProps {
  /** An event handler which receives the newly selected date. */
  onUpdate: (date: Date) => void;
  /** The current value of the DateInput. */
  value: Date;
}

/**
 * A component that renders a date input correctly for the target platform.
 * 
 * On iOS it will use the built in input which is a special button displaying a pop over picker.
 * 
 * On Android it will use a button which then displays the built in date input modal.
 */
export default function DateInput({ onUpdate, value }: DateInputProps) {
  const [open, setOpen] = useState(false),
    changeHandler = (_: Event, date?: Date) => {
      if (date) onUpdate(date);
      setOpen(false);
    };

  return Platform.select({
    ios: (
      <View style={{ flexGrow: 1 }}>
        <DateTimePicker value={value} onChange={changeHandler} />
      </View>
    ),

    android: (
      <View>
        <Button title={value.toLocaleDateString()} onPress={() => setOpen(true)} />
        { open && <DateTimePicker value={value} onChange={changeHandler} /> }
      </View>
    ),
  }) as ReactElement;
}
