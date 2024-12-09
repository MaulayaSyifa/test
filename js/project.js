let projects = [];

function addProject(e) {
	e.preventDefault();

	let title = document.getElementById("name").value;
	let content = document.getElementById("description").value;
	let startDate = document.getElementById("startDate").value;
	let endDate = document.getElementById("endDate").value;
	let imageInput = document.getElementById("fileUpload");
	let check1 = document.getElementById("nodeJs");
	let check2 = document.getElementById("nextJs");
	let check3 = document.getElementById("reactJs");
	let check4 = document.getElementById("typeScript");

	if (title == "" || content == "" || imageInput.files.length === 0) {
		return alert("All input fields cannot be empty");
	}

	if (check1.checked) {
		check1 = "";
	} else {
		check1 = "display: none";
	}

	if (check2.checked) {
		check2 = "";
	} else {
		check2 = "display: none";
	}

	if (check3.checked) {
		check3 = "";
	} else {
		check3 = "display: none";
	}

	if (check4.checked) {
		check4 = "";
	} else {
		check4 = "display: none";
	}

	let image = URL.createObjectURL(imageInput.files[0]);

	let project = {
		title: title,
		content: content,
		image: image,
		postedAt: new Date(),
		check1: check1,
		check2: check2,
		check3: check3,
		check4: check4,
		startDate: startDate,
		endDate: endDate,
	};

	projects.push(project);

	renderProject();
}

function renderProject() {
	console.log(projects);

	let projectListElement = document.getElementById("projectGrid");

	projectListElement.innerHTML = firstProjectContent();

	for (let i = 0; i < projects.length; i++) {
		let formattedDate = formatDateToWIB(projects[i].postedAt);
		let deadline = getDeadline(projects[i].startDate, projects[i].endDate);
		// menampilkan projects yang sudah kita buat dengan mengisi form
		console.log(projects[i]);

		projectListElement.innerHTML += `
        <div id="${i}">
			<div class="card">
				<div class="card-img"><img src="${projects[i].image}" /></div>
				<h3 class="card-title">${projects[i].title}</h3>
				<div class="card-detail">
					<p style="font-weight: 600">${formattedDate}</p>
					<p>duration : ${deadline}</p>
				</div>
				<div class="card-body">
					<p style="height: 100px">
						${projects[i].content}
					</p>
				</div>
				<div class="card-icon">
					<img src="./assets/icon/node-js.svg" style="${projects[i].check1}"/>
					<img src="./assets/icon/next-js.svg" style="${projects[i].check2}"/>
					<img src="./assets/icon/react-js.svg" style="${projects[i].check3}"/>
					<img src="./assets/icon/typescript.svg" style="${projects[i].check4}"/>
				</div>
				<div class="card-button">
					<a href="#" class="button">edit</a>
					<a href="#" class="button">delete</a>
				</div>
			</div>
		</div>
    `;
	}
}

function firstProjectContent() {
	return `
        <div class="card">
			<div class="card-img"><img src="./assets/image/blog-img.png" /></div>
				<h3 class="card-title">Get yourself motivated</h3>
			<div class="card-detail">
				<p style="font-weight: 600">12 Jul 2024 22:30 WIB</p>
				<p>duration : 1 month</p>
			</div>
			<div class="card-body">
				<p style="height: 100px">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum porro, illum totam
					nostrum sit delectus nisi sint magni perspiciatis adipisci?
				</p>
			</div>
			<div class="card-icon">
				<img src="./assets/icon/node-js.svg" />
					<img src="./assets/icon/next-js.svg" />
					<img src="./assets/icon/react-js.svg" />
					<img src="./assets/icon/typescript.svg" />
			</div>
			<div class="card-button">
				<a href="#" class="button">edit</a>
				<a href="#" class="button">delete</a>
			</div>
		</div>
    `;
}

function formatDateToWIB(date) {
	let months = [
		"Jan", // 0
		"Feb", // 1
		"Mar", // 2
		"Apr", // 3
		"Mei", // 4
		"Jun", // 5
		"Jul", // 6
		"Aug", // 7
		"Sep", // 8
		"Okt", // 9
		"Nov", // 10
		"Des", // 11
	];

	let day = date.getDate().toString().padStart(2, "0");
	let month = months[date.getMonth()]; // ===>>> bukan nama bulan, bukan angka bulan, tapi index dari bulan tersebut
	let year = date.getFullYear();

	let hours = date.getHours().toString().padStart(2, "0"); // ===> "2"

	let minutes = date.getMinutes().toString().padStart(2, "0");

	let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

	return formattedDate;
}

function getRelativeTime(targetDate) {
	let now = new Date();
	let diffInSeconds = Math.floor((now - targetDate) / 1000); // satuan dari ms ke detik

	console.log(diffInSeconds);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
	}

	let diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
	}
}

function getDeadline(startDate, endDate) {
	// Mengubah input tanggal menjadi objek Date
	var date1 = new Date(startDate);
	var date2 = new Date(endDate);

	// Menghitung selisih waktu dalam milidetik
	var deadline = Math.abs(date2 - date1);

	// Menghitung jumlah hari, jam, menit, dan detik
	var day = Math.floor(deadline / (1000 * 60 * 60 * 24));
	var hour = Math.floor((deadline % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minute = Math.floor((deadline % (1000 * 60 * 60)) / (1000 * 60));
	var second = Math.floor((deadline % (1000 * 60)) / 1000);

	if (day > 30) {
		var month = Math.floor(day / 30); // Anggap 1 bulan = 30 hari
		return month + " months";
	}

	// Menampilkan hasil rentang waktu
	// return day + " days, " + hour + " hours, " + minute + " minutes, " + second + " seconds";
	return day + " days";
}
