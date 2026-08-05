import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'certifications.json');

const INITIAL_CERTIFICATIONS = [
  {
    id: "aws-certified-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    image: "/ethnus.jpg",
    issueDate: "July 2025",
    skills: "Amazon Web Services (AWS) · Machine Learning · Artificial Intelligence(AI)",
    pdfUrl: "/certification/ethnus.pdf"
  },
  {
    id: "aws-certified-machine-learning-natural-language-speciality",
    title: "AWS Certified Machine Learning - Natural Language Speciality",
    image: "/aws.png",
    issueDate: "June 2025",
    skills: "Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker",
    pdfUrl: "/certification/awsmachine.pdf"
  },
  {
    id: "aws-certified-machine-learning",
    title: "AWS Certified Machine Learning",
    image: "/aws.png",
    issueDate: "June 2025",
    skills: "Amazon Web Services (AWS) · Machine Learning · AWS SageMaker",
    pdfUrl: "/certification/awsml.pdf"
  },
  {
    id: "gen-ai-using-ibm-watsonx",
    title: "GEN AI using IBM Watsonx",
    image: "/ibm1.png",
    issueDate: "June 2025",
    skills: "Machine Learning · Artificial Intelligence (AI) · IBM Servers · IBM Watson · Gen Ai",
    pdfUrl: "/certification/gen.pdf"
  },
  {
    id: "aws-cloud-foundation",
    title: "AWS Cloud Foundation",
    image: "/aws.png",
    issueDate: "May 2025",
    skills: "Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker",
    pdfUrl: "/certification/foundation.pdf"
  },
  {
    id: "image-processing-with-python-pil",
    title: "Image Processing with Python PIL",
    image: "/udemy.jpg",
    issueDate: "Feb 2024",
    skills: "PIL · Python (Programming Language) · Image Processing",
    pdfUrl: "/certification/ude.pdf"
  },
  {
    id: "internet-and-web-development-fundamentals",
    title: "Internet And Web Development Fundamentals",
    image: "/udemy.jpg",
    issueDate: "Feb 2024",
    skills: "Internet Protocol (IP) · Back-End Web Development",
    pdfUrl: "/certification/ude1.pdf"
  },
  {
    id: "python-skill-test",
    title: "Python Skill Test",
    image: "/hacker.png",
    issueDate: "Feb 2024",
    skills: "Python (Programming Language)",
    pdfUrl: "/certification/hacker.pdf"
  },
  {
    id: "matlab-basic",
    title: "MATLAB basic",
    image: "/matlab.png",
    issueDate: "August 2023",
    skills: "Matlab",
    pdfUrl: "/certification/hacker.pdf"
  }
];

export function getCertifications() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      saveCertifications(INITIAL_CERTIFICATIONS);
      return INITIAL_CERTIFICATIONS;
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading certifications file:", error);
    return INITIAL_CERTIFICATIONS;
  }
}

export function saveCertifications(certifications) {
  try {
    const dirPath = path.dirname(dataFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(certifications, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving certifications file:", error);
    return false;
  }
}
