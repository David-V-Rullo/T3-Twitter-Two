import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  FormEvent,
} from "react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0px";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

function NewTweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;
  return <Form />;
}
export default NewTweetForm;
function Form() {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setInputValue("");
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("submitting");
    createTweet.mutate({
      content: inputValue,
    });
  }
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-3"
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden border text-lg outline-none"
          placeholder="Whats Happening?"
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
}
