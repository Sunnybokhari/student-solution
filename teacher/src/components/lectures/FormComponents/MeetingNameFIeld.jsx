import { EuiFieldText, EuiFormRow } from "@elastic/eui";
import React from "react";

function MeetingNameField({ label, placeholder, value, setMeetingName }) {
  return (
    <EuiFormRow label={label}>
      <EuiFieldText
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
      />
    </EuiFormRow>
  );
}

export default MeetingNameField;
