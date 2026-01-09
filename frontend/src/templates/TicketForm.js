import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";


function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function TicketForm({ initialValues, onSubmit, submitLabel }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [datePurchase, setDatePurchase] = useState(todayISO());
  const [dateUpload, setDateUpload] = useState(todayISO());
  const [warrantyStart, setWarrantyStart] = useState(todayISO());
  const [warrantyEnd, setWarrantyEnd] = useState(todayISO());
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialValues) return;
    setId(String(initialValues.id ?? ""));
    setName(initialValues.name ?? "");
    setCategory(initialValues.category ?? "");
    setAmount(String(initialValues.amount ?? ""));
    setDatePurchase(initialValues.date_purchase ?? todayISO());
    setDateUpload(initialValues.date_upload ?? todayISO());
    setWarrantyStart(initialValues.warranty_start ?? todayISO());
    setWarrantyEnd(initialValues.warranty_end ?? todayISO());
  }, [initialValues]);

  const handleSubmit = () => {
    setError("");

    if (!id || !name || !category || !amount) {
      setError("Faltan campos obligatorios (id, name, category, amount).");
      return;
    }

    const amountNumber = Number(amount);
    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      setError("amount debe ser un número > 0.");
      return;
    }

    onSubmit({
      id: Number(id),
      name,
      category,
      image: null,
      amount: amountNumber,
      date_purchase: datePurchase,
      date_upload: dateUpload,
      warranty_start: warrantyStart,
      warranty_end: warrantyEnd,
    });
  };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
            contentContainerStyle={{ padding: 16, gap: 10 }}
            keyboardShouldPersistTaps="handled"
        >
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <Text>ID</Text>
            <TextInput
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>Nombre</Text>
            <TextInput
            value={name}
            onChangeText={setName}
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>Categoría</Text>
            <TextInput
            value={category}
            onChangeText={setCategory}
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>Importe</Text>
            <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>date_purchase</Text>
            <TextInput
            value={datePurchase}
            onChangeText={setDatePurchase}
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>date_upload</Text>
            <TextInput
            value={dateUpload}
            onChangeText={setDateUpload}
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>warranty_start</Text>
            <TextInput
            value={warrantyStart}
            onChangeText={setWarrantyStart}
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Text>warranty_end</Text>
            <TextInput
            value={warrantyEnd}
            onChangeText={setWarrantyEnd}
            style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
            />

            <Button title={submitLabel} onPress={handleSubmit} />
        </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
}
