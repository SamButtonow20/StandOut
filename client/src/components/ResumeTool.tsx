import React, { useState, ChangeEvent } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js`;

export default function ResumeTool() {
  const [resumeText, setResumeText] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const readTxtFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Unable to read text file");
        }
      };
      reader.onerror = () => reject("Failed to read file");
      reader.readAsText(file);
    });
  };

  const readPdfFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      text += strings.join(" ") + "\n\n";
    }
    return text;
  };

  const readDocxFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFeedback("");
    setResumeText("");

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let text = "";
      if (file.type === "text/plain") {
        text = await readTxtFile(file);
      } else if (file.type === "application/pdf") {
        text = await readPdfFile(file);
      } else if (
        file.name.endsWith(".docx") ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await readDocxFile(file);
      } else {
        setError("Unsupported file type. Please upload a .txt, .pdf or .docx file.");
        return;
      }
      setResumeText(text);
    } catch (err) {
      setError("Failed to read file: " + (err as string));
    }
  };

  const handleSubmit = async () => {
    if (!resumeText.trim()) return;

    setLoading(true);
    setError(null);
    setFeedback("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/resume-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unknown server error");
      }

      const data: { feedback: string } = await res.json();
      setFeedback(data.feedback);
    } catch (err: any) {
      setError(err.message || "Failed to get feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>AI Resume Critique</h2>
      <p>Upload your resume as a TXT, PDF, or DOCX file to get AI-powered feedback in seconds.</p>

      <input
        type="file"
        accept=".txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        className="file-input"
      />

      <button
        disabled={loading || !resumeText.trim()}
        onClick={handleSubmit}
      >
        {loading ? "Analyzing..." : "Get Feedback"}
      </button>

      {error && <div className="error">{error}</div>}

      {feedback && <pre className="feedback">{feedback}</pre>}
    </section>
  );
}
