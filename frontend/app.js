let currentEditingId = null;

// Fetch all workouts and display them
document.addEventListener('DOMContentLoaded', fetchWorkouts);

// Form submission for adding or editing a workout
document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const load = document.getElementById('load').value;
    const reps = document.getElementById('reps').value;

    // If we're editing an existing workout
    if (currentEditingId) {
        // Make the PATCH request to update the workout
        fetch(`http://localhost:4000/api/workouts/${currentEditingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, load, reps })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Workout Updated:', data);
            updateWorkoutInList(currentEditingId, data);  // Directly update the workout item in the list
            resetForm();  // Reset the form for the next action
        })
        .catch(error => console.error('Error updating workout:', error));
    } else {
        // If we're adding a new workout
        fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, load, reps })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Workout Added:', data);
            document.getElementById('workout-form').reset();
            addWorkoutToList(data);  // Add the new workout to the list
        })
        .catch(error => console.error('Error adding workout:', error));
    }
});

// Fetch and display all workouts
function fetchWorkouts() {
    fetch('http://localhost:4000/api/workouts')
        .then(response => response.json())
        .then(workouts => {
            workouts.forEach(workout => {
                addWorkoutToList(workout);
            });
        })
        .catch(error => console.error('Error fetching workouts:', error));
}

// Add workout to the list (for both add and edit)
function addWorkoutToList(workout) {
    const workoutList = document.getElementById('workout-list');
    const li = document.createElement('li');
    li.classList.add('workout-item');
    li.innerHTML = `
        <strong>${workout.title}</strong> - ${workout.load}kg, ${workout.reps} reps
        <button onclick="editWorkout('${workout._id}', '${workout.title}', '${workout.load}', '${workout.reps}')">Edit</button>
        <button class="delete" onclick="deleteWorkout('${workout._id}')">Delete</button>
    `;
    workoutList.appendChild(li);
}

// Edit workout - Prefill form with current data
function editWorkout(id, title, load, reps) {
    currentEditingId = id;  // Set the current editing ID
    document.getElementById('title').value = title;
    document.getElementById('load').value = load;
    document.getElementById('reps').value = reps;

    // Change the form submit button text to "Update Workout"
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = "Update Workout";
}

// Update the workout in the list (UI update after edit)
function updateWorkoutInList(id, updatedWorkout) {
    const workoutList = document.getElementById('workout-list');
    const workoutItem = [...workoutList.children].find(item => item.querySelector('button').getAttribute('onclick').includes(id));
    workoutItem.innerHTML = `
        <strong>${updatedWorkout.title}</strong> - ${updatedWorkout.load}kg, ${updatedWorkout.reps} reps
        <button onclick="editWorkout('${updatedWorkout._id}', '${updatedWorkout.title}', '${updatedWorkout.load}', '${updatedWorkout.reps}')">Edit</button>
        <button class="delete" onclick="deleteWorkout('${updatedWorkout._id}')">Delete</button>
    `;
}

// Delete workout
function deleteWorkout(id) {
    fetch(`http://localhost:4000/api/workouts/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Workout Deleted:', data);
        const workoutList = document.getElementById('workout-list');
        const workoutItem = document.querySelector(`button[onclick="deleteWorkout('${id}')"]`).parentElement;
        workoutList.removeChild(workoutItem);
    })
    .catch(error => console.error('Error deleting workout:', error));
}

// Reset the form to "Add" state
function resetForm() {
    document.getElementById('workout-form').reset();
    currentEditingId = null;  // Clear the current editing ID
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = "Add Workout";  // Change button text back to "Add Workout"
}
