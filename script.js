function login(event) {
  event.preventDefault();
  alert("Login successful! Redirecting to dashboard...");
  window.location.href = "dashboard.html";
}

function markAsDone(card) {
  if (!card.classList.contains("done")) {
    card.classList.add("done");
    card.innerHTML += "<p>✅ Marked as Done!</p>";
  }
}

function toggleWorkoutExplorer() {
  const section = document.getElementById("workoutExplorer");
  section.style.display = section.style.display === "none" ? "block" : "none";
}

async function loadNinjaWorkouts() {
  const muscle = document.getElementById("ninjaMuscle").value;
  const container = document.getElementById("ninjaWorkoutList");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'j78F5VNMYVv5nkujtrot7Q==GnjQqZoUgbcOJxzX' // Replace with your real key
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status} – ${errText}`);
    }

    const data = await response.json();
    renderNinjaWorkouts(data.slice(0, 8));
  } catch (err) {
    console.error("Error loading workouts:", err);
    container.innerHTML = "<p>❌ Failed to load exercises. Check API key or console.</p>";
  }
}

function renderNinjaWorkouts(exercises) {
  const container = document.getElementById("ninjaWorkoutList");
  container.innerHTML = "";

  if (exercises.length === 0) {
    container.innerHTML = "<p>No workouts found for this muscle group.</p>";
    return;
  }

  exercises.forEach(ex => {
    const card = document.createElement("div");
    card.className = "workout-card";
    card.innerHTML = `
      <h3>${ex.name}</h3>
      <p><strong>Muscle:</strong> ${ex.muscle}</p>
      <p><strong>Type:</strong> ${ex.type}</p>
      <p><strong>Difficulty:</strong> ${ex.difficulty}</p>
      <p>${ex.instructions}</p>
    `;
    container.appendChild(card);
  });
}
