import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getQuestion,
  submitAnswer
} from "../services/mockInterviewService";
import aiInterviewer from "../assets/AI-interviewer.png"; 

function InterviewSession() {

  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Evaluation loading state
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Text-to-Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);

  // 🔊 Speak Question
  const speakQuestion = (text) => {

    if (!window.speechSynthesis) {
      console.log("Text-to-Speech is not supported.");
      return;
    }

    // Stop any previous speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {

    fetchQuestion();

    // Stop speech when component is unmounted
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };

  }, []);

  const fetchQuestion = async () => {

    try {

      const res = await getQuestion(sessionId);

      console.log(res);

      if (!res.data) {

        setQuestion("Interview Completed");

        return;
      }

      setQuestion(res.data.question);

      setQuestionNumber(res.data.questionNumber);

      // 🔊 Speak the new question
      speakQuestion(res.data.question);

    } catch (err) {

      console.log(err);

    }
  };

  // 🎤 Start / Stop Voice Input
  const handleVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech recognition is not supported in this browser."
      );

      return;
    }

    // If microphone is already listening → stop it
    if (isListening) {

      stopListening();

      return;
    }

    // Stop question speech before user starts answering
    window.speechSynthesis.cancel();

    setIsSpeaking(false);

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.onstart = () => {

      setIsListening(true);

    };

    recognition.onresult = (event) => {

      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0].transcript;

      }

      setAnswer(transcript);

    };

    recognition.onerror = (event) => {

      console.log(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

    };

    recognition.onend = () => {

      setIsListening(false);

    };

    recognitionRef.current = recognition;

    recognition.start();

  };

  // 🛑 Stop microphone
  const stopListening = () => {

    if (recognitionRef.current) {

      recognitionRef.current.stop();

      recognitionRef.current = null;

    }

    setIsListening(false);

  };

  // ⌨️ Enter → Submit
  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSubmit();

    }

  };

  const handleSubmit = async () => {

    // Stop microphone before submitting
    stopListening();

    // Stop question speech
    window.speechSynthesis.cancel();

    setIsSpeaking(false);

    // Start evaluation state
    setIsEvaluating(true);

    try {

      const res =
        await submitAnswer(
          sessionId,
          answer
        );

      console.log(res);

      setFeedback(
        res.data.feedback
      );

      if (
        res.data.nextQuestionAvailable
      ) {

        setAnswer("");

        setFeedback("");

        // Clear previous question immediately
        setQuestion("");

        // Fetch next question
        await fetchQuestion();

      } else {

        // ✅ Final step → Report
        setTimeout(() => {

          navigate(
            `/interview-report/${sessionId}`
          );

        }, 1500);

      }

    } catch (err) {

      console.log(err);

    } finally {

      setIsEvaluating(false);

    }

  };

    // 🎨 Avatar animation state
  const getAvatarAnimation = () => {

    if (isSpeaking) {
  return "avatarSpeaking 0.45s infinite ease-in-out";
}

    if (isListening) {
      return "avatarListening 1s infinite ease-in-out";
    }

    if (isEvaluating) {
      return "avatarThinking 1.2s infinite ease-in-out";
    }

    return "avatarIdle 2.5s infinite ease-in-out";
  };
    const avatarStyles = `
    @keyframes avatarIdle {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

   @keyframes avatarSpeaking {
  0%, 100% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.035);
  }

  50% {
    transform: scale(1.06);
  }

  75% {
    transform: scale(1.025);
  }
}
@keyframes speakingRing {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }

  70% {
    transform: scale(1.15);
    opacity: 0;
  }

  100% {
    transform: scale(1.15);
    opacity: 0;
  }
}
    @keyframes avatarListening {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35);
  }

  50% {
    transform: scale(1.05);
    box-shadow:
      0 0 0 8px rgba(59, 130, 246, 0.10),
      0 0 20px rgba(59, 130, 246, 0.25);
  }
}
    @keyframes avatarThinking {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(3deg) scale(1.04);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  `;

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px"
      }}
    >

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >

        {/* Header */}

        <div
          style={{
            marginBottom: "30px"
          }}
        >

          <h1
            style={{
              marginBottom: "8px"
            }}
          >
            AI Mock Interview
          </h1>

          <p
            style={{
              color: "#666",
              margin: 0
            }}
          >
            Practice your technical interview
            with an AI interviewer.
          </p>

        </div>


        {/* AI Interviewer */}

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >

        <style>
  {avatarStyles}
</style>

<div
  style={{
    position: "relative",
    width: "90px",
    height: "90px",
    flexShrink: 0
  }}
>
  {isSpeaking && (
  <div
    style={{
      position: "absolute",
      width: "110px",
      height: "110px",
      top: "-10px",
      left: "-10px",
      borderRadius: "50%",
      border: "2px solid rgba(99, 102, 241, 0.35)",
      animation: "speakingRing 1.2s infinite ease-out",
      pointerEvents: "none"
    }}
  />
)}
  <div
    style={{
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      background: "#eef2ff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      animation: getAvatarAnimation()
    }}
  >
    <img
      src={aiInterviewer}
      alt="AI Interviewer"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  </div>
</div>  
          {/* Interviewer information */}

          <div>

            <h2
              style={{
                margin: "0 0 8px 0"
              }}
            >
              AI Interviewer
            </h2>


            {/* Dynamic status */}

            {isSpeaking && (

              <p
                style={{
                  margin: 0
                }}
              >
                🔊 Speaking...
              </p>

            )}


            {isListening && (

              <p
                style={{
                  margin: 0
                }}
              >
                🎤 Listening to your answer...
              </p>

            )}


            {isEvaluating && (

              <p
                style={{
                  margin: 0
                }}
              >
                ⏳ Evaluating your answer...
              </p>

            )}


            {!isSpeaking &&
              !isListening &&
              !isEvaluating && (

                <p
                  style={{
                    margin: 0
                  }}
                >
                  🟢 Ready for your answer
                </p>

              )}

          </div>

        </div>


        {/* Question Card */}

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >

          <p
            style={{
              margin: "0 0 10px 0",
              color: "#666",
              fontSize: "14px"
            }}
          >
            QUESTION {questionNumber}
          </p>


          <h2
            style={{
              margin: 0,
              lineHeight: "1.5"
            }}
          >
            {question}
          </h2>

        </div>


        {/* Answer Section */}

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "25px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >

          <h3>
            Your Answer
          </h3>


          {/* Voice Button */}

          <button
            onClick={handleVoiceInput}
            disabled={
              isEvaluating ||
              isSpeaking
            }
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor:
                isEvaluating ||
                isSpeaking
                  ? "not-allowed"
                  : "pointer",
              marginBottom: "15px"
            }}
          >

            {isListening
              ? "🔴 Stop Listening"
              : "🎤 Speak Answer"}

          </button>


          {/* Answer Textarea */}

          <textarea
            rows="7"
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={
              "Type your answer or use the microphone..."
            }
            disabled={
              isEvaluating ||
              isSpeaking
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              resize: "vertical",
              fontSize: "15px",
              lineHeight: "1.5"
            }}
          />


          {/* Submit */}

          <button
            onClick={handleSubmit}
            disabled={
              isEvaluating ||
              !answer.trim() ||
              isSpeaking
            }
            style={{
              marginTop: "15px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor:
                isEvaluating ||
                !answer.trim() ||
                isSpeaking
                  ? "not-allowed"
                  : "pointer"
            }}
          >

            {isEvaluating
              ? "⏳ Evaluating..."
              : "Submit Answer"}

          </button>


          {/* Evaluation Message */}

          {isEvaluating && (

            <p
              style={{
                marginTop: "15px"
              }}
            >
              ⏳ Evaluating your answer...
              Please wait.
            </p>

          )}


          {/* Feedback */}

          {feedback && (

            <div
              style={{
                marginTop: "25px",
                padding: "15px",
                borderRadius: "10px",
                background: "#f5f5f5"
              }}
            >

              <h3>
                AI Feedback
              </h3>

              <p>
                {feedback}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default InterviewSession;