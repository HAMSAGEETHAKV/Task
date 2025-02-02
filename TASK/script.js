document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dataForm");
    const cardContainer = document.getElementById("cardContainer");
    const homeCardContainer = document.getElementById("homeCardContainer");
    const placedCount = document.getElementById("placedCount");
    const unplacedCount = document.getElementById("unplacedCount");
    const totalStudentsElement = document.getElementById("totalStudents");


    let storedData = JSON.parse(localStorage.getItem("placementData")) || [];


    function renderCards() {

        if (cardContainer) {
            cardContainer.innerHTML = "";
            storedData.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <p><strong>${item.name}</strong> - ${item.role} (${item.status})</p>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Phone:</strong> ${item.phone}</p>
                    <p><strong>Course:</strong> ${item.course}</p>
                    <button onclick="deleteCard(${index})">Delete</button>
                `;
                cardContainer.appendChild(card);
            });
        }


        if (homeCardContainer) {
            homeCardContainer.innerHTML = "";
            storedData.forEach((item) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `<p>${item.name} - ${item.role} (${item.status})</p>`;
                homeCardContainer.appendChild(card);
            });
        }


        updateCounts();
    }


    function updateCounts() {
        const totalStudents = storedData.length;
        const placed = storedData.filter(item => item.status === "placed").length;
        const unplaced = totalStudents - placed;

        if (totalStudentsElement) totalStudentsElement.textContent = totalStudents;
        if (placedCount) placedCount.textContent = placed;
        if (unplacedCount) unplacedCount.textContent = unplaced;
    }


    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();


            const name = document.getElementById("name").value;
            const role = document.getElementById("role").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const course = document.getElementById("course").value;
            const status = document.getElementById("status").value;

            storedData.push({
                name,
                role,
                email,
                phone,
                course,
                status
            });


            localStorage.setItem("placementData", JSON.stringify(storedData));


            renderCards();


            form.reset();
        });
    }


    window.deleteCard = (index) => {
        storedData.splice(index, 1);
        localStorage.setItem("placementData", JSON.stringify(storedData));
        renderCards();
    };

    renderCards();
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dataForm");

    function fetchStudents() {
        fetch("http://localhost:5000/students")
            .then(res => res.json())
            .then(data => console.log(data));
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const studentData = {
                name: document.getElementById("name").value,
                role: document.getElementById("role").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                course: document.getElementById("course").value,
                status: document.getElementById("status").value
            };

            fetch("http://localhost:5000/addStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            }).then(() => fetchStudents());
        });
    }

    fetchStudents();
});