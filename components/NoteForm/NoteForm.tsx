import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValuesProps {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: NoteFormValuesProps = {
  title: "",
  content: "",
  tag: "Todo",
};


const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Invalid tag")
    .required("Please choose your tag"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: async (values: NoteFormValuesProps) => {
      const res = await createNote(values);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleCreateNote = (values: NoteFormValuesProps) => {
    mutationPost.mutate(values);
  };

  const handleSubmit = (
    values: NoteFormValuesProps,
    actions: FormikHelpers<NoteFormValuesProps>
  ) => {
    handleCreateNote(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={OrderFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
