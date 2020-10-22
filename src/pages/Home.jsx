import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div className="one-dream">
        <h1>Welcome</h1>
        <span
          style={{
            textAlign: "center",
          }}
        >
          {" "}
          Keep a journal of your dreams with <span style={{
            color: "#eb10db",
          }}>Reve.le</span>
        </span>
        <img
          style={{
            width: "30vw",
            marginTop: "30px",
            marginBottom: "20px",
          }}
          src="https://res.cloudinary.com/ddwcgukvk/image/upload/v1603396204/dream4_znu23n.png"
          alt="revele1"
        />
        <p>
          <span style={{
            color: "#743ece",
          }}>1.</span> When you wake up, take a few seconds to tell us how you feel and to
          fill in the key elements of your dream.
        </p>
        <img
          style={{
            width: "30vw",
            marginTop: "30px",
            marginBottom: "20px",
          }}
          src="https://res.cloudinary.com/ddwcgukvk/image/upload/v1603292489/ku3ovvmxk3ywtoj1qvxk.png"
          alt="revele2"
        />
        <p>
        <span style={{
            color: "#743ece",
          }}>2.</span> All your dreams are logged in the application, you can choose to
          make them public one by one if you want to share them.
        </p>
        <img
          style={{
            width: "30vw",
            marginTop: "30px",
            marginBottom: "20px",
          }}
          src="https://res.cloudinary.com/ddwcgukvk/image/upload/v1603292435/qssbiizwyig3oopyh4rx.png"
          alt="revele3"
        />
        <p>
        <span style={{
            color: "#743ece",
          }}>3.</span> All your dreams are logged in the application, you can choose to
          make them public one by one if you want to share them.
        </p>
      </div>
    );
  }
}

export default Home;
