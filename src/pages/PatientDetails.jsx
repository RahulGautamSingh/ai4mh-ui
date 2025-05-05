import { useParams } from "react-router-dom";

export default function PatientDetails() {
  const { patientId } = useParams();

  return <div>Patient ID: {patientId}</div>;
}
