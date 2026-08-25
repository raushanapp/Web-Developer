import { Courses } from "./components/courses";
import { AllCaps } from "./components/allcaps";

export default function Home() {
  return (
    <main>
      <h1>Tony Aliceas Courses</h1>
      <AllCaps>
        <Courses />
      </AllCaps>
    </main>
  );
}
