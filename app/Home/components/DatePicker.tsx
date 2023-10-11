export default function DatePicker() {
  return (
    <DatePicker
      label="Helper text example"
      slotProps={{
        textField: {
          helperText: "MM/DD/YYYY",
        },
      }}
    />
  );
}
