import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    /* Prevent form from submitting by default */
    e.preventDefault();

    /* If file is not selected, then show alert message */
    if (!inputFileRef.current?.files?.length) {
      alert("Please, select file you want to upload");
      return;
    }

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("subject", subject);
      formData.append("message", message);
    });

    /* Send request to our api route */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as {
      status: "ok" | "fail";
      message: string;
    };

    alert(body.message);

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  return (
    <form>
      <div>
        <input type="file" name="myfile" ref={inputFileRef} />
      </div>

      <div>
        <input
          type="text"
          name="fistname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>


      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>


      <div>
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <div>
        <input
          type="submit"
          value="Upload"
          disabled={isLoading}
          onClick={handleOnClick}
        />
        {isLoading && ` Wait, please...`}
      </div>
    </form>
  );
};

export default Home;
