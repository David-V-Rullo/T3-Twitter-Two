import { type NextPage } from "next";
import NewTweetForm from "~/components/NewTweetForm";

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <div>
          <h1>Home</h1>
        </div>
      </header>
      <NewTweetForm />
    </>
  );
};

export default Home;
