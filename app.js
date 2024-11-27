const cargoList = [
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24",
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26",
    },
  ];
  
  const statusColors = {
    "Ожидает отправки": "text-warning",
    "В пути": "text-primary",
    "Доставлен": "text-success",
  };
  
  const cargoTable = document.getElementById("cargoTable");
  const cargoForm = document.getElementById("cargoForm");
  const statusFilter = document.getElementById("statusFilter");
  
  // Рендер таблицы
  function renderTable(filter = "") {
    cargoTable.innerHTML = "";
    cargoList
      .filter((cargo) => !filter || cargo.status === filter)
      .forEach((cargo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${cargo.id}</td>
          <td>${cargo.name}</td>
          <td class="${statusColors[cargo.status]}">${cargo.status}</td>
          <td>${cargo.origin}</td>
          <td>${cargo.destination}</td>
          <td>${cargo.departureDate}</td>
          <td>
            <select class="form-select" onchange="updateStatus('${cargo.id}', this.value)">
              <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
              <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
              <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
            </select>
          </td>
        `;
        cargoTable.appendChild(row);
      });
  }
  
  // Добавление нового груза
  cargoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cargoName").value.trim();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departureDate").value;
  
    if (!name || !origin || !destination || !departureDate) {
      alert("Все поля должны быть заполнены!");
      return;
    }
  
    const id = `CARGO${String(cargoList.length + 1).padStart(3, "0")}`;
    cargoList.push({ id, name, status: "Ожидает отправки", origin, destination, departureDate });
    renderTable();
    cargoForm.reset();
  });
  
  // Обновление статуса груза
  function updateStatus(id, newStatus) {
    const cargo = cargoList.find((c) => c.id === id);
    if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
      alert("Нельзя изменить статус на 'Доставлен' до даты отправления!");
      renderTable(statusFilter.value);
      return;
    }
    cargo.status = newStatus;
    renderTable(statusFilter.value);
  }
  
  // Фильтрация по статусу
  statusFilter.addEventListener("change", (e) => renderTable(e.target.value));
  
  // Инициализация
  renderTable();
  