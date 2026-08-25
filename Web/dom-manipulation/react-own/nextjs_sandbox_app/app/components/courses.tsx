export function Courses() {
  const data = [
    "Understand React",
    "Understanding HTML and CSS",
    "Javascript : Understanding the Weird Parts",
  ];

  return (
    <ul>
      {data?.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
  );
}
