// ===============================
// Disease Database
// ===============================
const diseases = [
  {
    name: "Viral Fever",
    symptoms: ["fever", "headache", "fatigue"],
    description: "A common viral infection causing fever, weakness, and body pain.",
    medicine: "Paracetamol",
    dosage: "500mg twice daily",
    robot: "Drug Delivery Micro Robot",
    robotType: "Nanobot",
    principle: "Targeted drug release",
    treatment: "Symptomatic treatment with rest and hydration",
    additional: "ORS, Vitamin supplements",
    precautions: "Avoid cold drinks, maintain hydration",
    severity: "Low",
    recovery: "5-7 days",
    image: "assets/disease-fever.png"
  },
  {
    name: "Dengue",
    symptoms: ["fever", "rash", "joint pain", "nausea"],
    description: "Mosquito-borne viral infection causing fever, rash, and joint pain.",
    medicine: "Paracetamol (avoid aspirin)",
    dosage: "500mg every 6 hours",
    robot: "Biohybrid Micro Robot",
    robotType: "Biohybrid",
    principle: "Assist immune response",
    treatment: "Fluid replacement and monitoring",
    additional: "Platelet count monitoring",
    precautions: "Avoid NSAIDs, monitor platelet levels",
    severity: "High",
    recovery: "10-14 days",
    image: "assets/disease-dengue.png"
  },
  {
    name: "Malaria",
    symptoms: ["fever", "chills", "sweating", "headache"],
    description: "Parasitic infection transmitted by mosquitoes.",
    medicine: "Chloroquine / Artemisinin",
    dosage: "As prescribed by doctor",
    robot: "Magnetic Micro Robot",
    robotType: "Microbot",
    principle: "Magnetic field navigation",
    treatment: "Antimalarial drug therapy",
    additional: "Hydration, rest",
    precautions: "Avoid mosquito bites, complete full course",
    severity: "Medium",
    recovery: "7-14 days",
    image: "assets/disease-malaria.png"
  },
  {
    name: "Cancer",
    symptoms: ["weight loss", "fatigue", "abnormal growth"],
    description: "Uncontrolled growth of abnormal cells in the body.",
    medicine: "Chemotherapy drugs",
    dosage: "As prescribed by oncologist",
    robot: "Cancer Targeting Nanobot",
    robotType: "Nanobot",
    principle: "Target cancer cells directly",
    treatment: "Targeted chemotherapy",
    additional: "Pain management, supportive care",
    precautions: "Regular monitoring, avoid infections",
    severity: "Critical",
    recovery: "Varies",
    image: "assets/disease-cancer.png"
  }
];

// ===============================
// Micro Robot Database
// ===============================
const robots = [
  {
    name: "Drug Delivery Micro Robot",
    type: "Nanobot",
    principle: "Targeted drug release",
    diseases: ["Viral Fever", "Typhoid"],
    advantages: "Precise delivery, minimal side effects",
    limitations: "Limited to drug-based diseases",
    image: "assets/robot-drug.png"
  },
  {
    name: "Biohybrid Micro Robot",
    type: "Biohybrid",
    principle: "Assist immune response",
    diseases: ["Dengue"],
    advantages: "Supports immune system",
    limitations: "Complex design",
    image: "assets/robot-biohybrid.png"
  },
  {
    name: "Magnetic Micro Robot",
    type: "Microbot",
    principle: "Magnetic field navigation",
    diseases: ["Malaria"],
    advantages: "Controlled navigation",
    limitations: "Requires external magnetic field",
    image: "assets/robot-magnetic.png"
  },
  {
    name: "Cancer Targeting Nanobot",
    type: "Nanobot",
    principle: "Target cancer cells directly",
    diseases: ["Cancer"],
    advantages: "Direct targeting of tumor cells",
    limitations: "Expensive, complex design",
    image: "assets/robot-cancer.png"
  }
];

// ===============================
// Diagnosis Form Logic
// ===============================
if (document.getElementById("diagnosisForm")) {
  document.getElementById("diagnosisForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const patientName = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const factor = document.getElementById("factor").value;
    const bodypart = document.getElementById("bodypart").value;
    const days = document.getElementById("days").value;
    const temp = document.getElementById("temp").value;
    const bp = document.getElementById("bp").value;

    // Collect symptoms
    const symptomsChecked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);

    let matchedDisease = null;
    diseases.forEach(d => {
      const matchCount = d.symptoms.filter(s => symptomsChecked.includes(s)).length;
      if (matchCount >= 2) {
        matchedDisease = d;
      }
    });

    let diagnosisData;
    if (matchedDisease) {
      diagnosisData = {
        patientName,
        age,
        gender,
        factor,
        bodypart,
        days,
        temp,
        bp,
        disease: matchedDisease
      };
    } else {
      diagnosisData = { error: "Unable to identify disease accurately. Please consult a doctor." };
    }

    localStorage.setItem("diagnosis", JSON.stringify(diagnosisData));

    // Redirect with slight delay
    setTimeout(() => {
      window.location.href = "result.html";
    }, 1000);
  });
}

// ===============================
// Result Page Logic
// ===============================
if (document.getElementById("reportCard")) {
  const data = JSON.parse(localStorage.getItem("diagnosis"));
  const card = document.getElementById("reportCard");

  if (data && !data.error) {
    const d = data.disease;
    card.innerHTML = `
      <h3>Medical Report for ${data.patientName}</h3>
      <p><b>Age:</b> ${data.age} | <b>Gender:</b> ${data.gender}</p>
      <img src="${d.image}" alt="${d.name}" style="max-width:150px; margin:10px 0;">
      <p><b>Disease:</b> ${d.name}</p>
      <p><b>Description:</b> ${d.description}</p>
      <p><b>Recommended Medicine:</b> ${d.medicine}</p>
      <p><b>Dosage:</b> ${d.dosage}</p>
      <p><b>Treatment Method:</b> ${d.treatment}</p>
      <p><b>Additional Medicines:</b> ${d.additional}</p>
      <p><b>Precautions:</b> ${d.precautions}</p>
      <p><b>Severity Level:</b> ${d.severity}</p>
      <p><b>Estimated Recovery Time:</b> ${d.recovery}</p>
      <p><b>Recommended Micro Robot:</b> ${d.robot}</p>
      <p><b>Robot Type:</b> ${d.robotType}</p>
      <p><b>Robot Working Principle:</b> ${d.principle}</p>
      <p><i>Medical Advice: Please follow prescribed treatment and consult a doctor if symptoms worsen.</i></p>
    `;
  } else {
    card.innerHTML = `
      <h3>Diagnosis Result</h3>
      <p>${data.error}</p>
    `;
  }
}

// ===============================
// Populate Disease Cards (diseases.html)
// ===============================
if (document.getElementById("diseaseCards")) {
  const diseaseCards = document.getElementById("diseaseCards");
  diseases.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${d.image}" alt="${d.name}" style="max-width:100%; margin-bottom:10px;">
      <h3>${d.name}</h3>
      <p><b>Symptoms:</b> ${d.symptoms.join(", ")}</p>
      <p><b>Medicine:</b> ${d.medicine}</p>
      <p><b>Recommended Micro Robot:</b> ${d.robot}</p>
      <p><b>Treatment:</b> ${d.treatment}</p>
      <p><b>Severity:</b> ${d.severity}</p>
      <p><b>Recovery Time:</b> ${d.recovery}</p>
    `;
    diseaseCards.appendChild(card);
  });
}

// ===============================
// Populate Robot Cards (robots.html)
// ===============================
// ===============================
// Populate Robot Cards (robots.html)
// ===============================
if (document.getElementById("robotCards")) {
  const robotCards = document.getElementById("robotCards");
  robots.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}" style="max-width:100%; margin-bottom:10px;">
      <h3>${r.name}</h3>
      <p><b>Type:</b> ${r.type}</p>
      <p><b>Working Principle:</b> ${r.principle}</p>
      <p><b>Suitable Diseases:</b> ${r.diseases.join(", ")}</p>
      <p><b>Advantages:</b> ${r.advantages}</p>
      <p><b>Limitations:</b> ${r.limitations}</p>
    `;
    robotCards.appendChild(card);
  });
}

// ===============================
// About Page Logic (about.html)
// ===============================
// If you want to add a dynamic image or extra info on the About page
if (document.getElementById("aboutCard")) {
  const aboutCard = document.getElementById("aboutCard");
  aboutCard.innerHTML += `
    <img src="assets/about-project.png" alt="About Project" style="max-width:100%; margin-top:15px;">
  `;
}

// ===============================
// Contact Page Logic (contact.html)
// ===============================
// Example: dynamically append a map or contact image
if (document.getElementById("contactCard")) {
  const contactCard = document.getElementById("contactCard");
  contactCard.innerHTML += `
    <img src="assets/contact-office.png" alt="Office Location" style="max-width:100%; margin-top:15px;">
  `;
}
