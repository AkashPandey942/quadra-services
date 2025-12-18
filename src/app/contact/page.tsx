"use client";
import { Container, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    alert("Message sent!");
  };

  return (
    <Container sx={{ py: 8 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Name" {...register("name")} />
        <TextField fullWidth label="Email" sx={{ mt: 2 }} {...register("email")} />
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          sx={{ mt: 2 }}
          {...register("message")}
        />
        <Button variant="contained" sx={{ mt: 3 }} type="submit">
          Send
        </Button>
      </form>
    </Container>
  );
}
