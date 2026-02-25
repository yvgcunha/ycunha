// script.js
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const CATS = { despesa: ['Casa', 'Carro', 'Yuri', 'Alimentação','Impostos', 'Outros'], receita: ['Salário', 'Freela', 'Proventos'] };
let DATA = JSON.parse(localStorage.getItem('fin_v_final')) || [];
let state = { view: 'dashboard', hidden: false, month: 'all', smartFilter: '', sortKey: 'month', sortOrder: 'desc' };

function handleLogin() {
    if(document.getElementById('passInput').value === '130994') {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('mainLayout').style.display = 'flex';
        init();
    }
}

function init() {
    populateSelectors();
    render();
}

function render() {
    const container = document.getElementById('pageContent');
    const filtered = DATA.filter(i => {
        const m = state.month === 'all' || i.month == state.month;
        const s = i.name.toLowerCase().includes(state.smartFilter) || i.cat.toLowerCase().includes(state.smartFilter);
        return m && s;
    });

    if(state.view === 'dashboard') {
        const rec = filtered.filter(i=>i.type==='receita').reduce((s,i)=>s+i.val,0);
        const desp = filtered.filter(i=>i.type==='despesa').reduce((s,i)=>s+i.val,0);

        container.innerHTML = `
            <div class="card search-box">
                <input type="text" class="form-control" placeholder="🔍 Pesquisar no Dashboard..." oninput="state.smartFilter=this.value.toLowerCase(); render()">
            </div>
            <div class="hero-grid">
                <div class="card"><small>RECEITAS</small><h2 class="${state.hidden?'hidden-val':''}">R$ ${rec.toLocaleString()}</h2></div>
                <div class="card"><small>DESPESAS</small><h2 class="${state.hidden?'hidden-val':''}">R$ ${desp.toLocaleString()}</h2></div>
                <div class="card"><small>SALDO</small><h2 class="${state.hidden?'hidden-val':''}" style="color:var(--blue)">R$ ${(rec-desp).toLocaleString()}</h2></div>
            </div>
            <div class="charts-grid">
                <div class="card"><h3>Evolução</h3><canvas id="lineChart"></canvas></div>
                <div class="card"><h3>Categorias</h3><canvas id="pieChart"></canvas></div>
            </div>
            <div class="card table-card">
                <h3>Movimentações Recentes</h3>
                <div class="table-container">${generateTableHTML(filtered)}</div>
            </div>
        `;
        setTimeout(() => renderCharts(filtered), 10);
    } else {
        container.innerHTML = `
            <div class="card search-box">
                <input type="text" class="form-control" placeholder="🔍 Pesquisar Movimentações..." oninput="state.smartFilter=this.value.toLowerCase(); render()">
            </div>
            <div class="card table-card">
                <div class="table-container">${generateTableHTML(filtered)}</div>
            </div>
        `;
    }
}

function generateTableHTML(data) {
    const sorted = [...data].sort((a, b) => {
        let valA = a[state.sortKey], valB = b[state.sortKey];
        return state.sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    const total = sorted.reduce((s, i) => s + (i.type === 'receita' ? i.val : -i.val), 0);

    return `
        <table>
            <thead>
                <tr>
                    <th onclick="toggleSort('month')">Mês ↕</th>
                    <th onclick="toggleSort('cat')">Categoria ↕</th>
                    <th onclick="toggleSort('name')">Descrição ↕</th>
                    <th onclick="toggleSort('val')">Valor ↕</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${sorted.map(i => `
                    <tr>
                        <td>${MONTHS[i.month]}</td>
                        <td><span class="tag">${i.cat}</span></td>
                        <td><b>${i.name}</b></td>
                        <td style="color:${i.type==='receita'?'var(--green)':'var(--red)'}" class="${state.hidden?'hidden-val':''}">
                            R$ ${i.val.toLocaleString()}
                        </td>
                        <td>
                            <button class="btn-icon" onclick="edit(${i.id})">✏️</button>
                            <button class="btn-icon" onclick="del(${i.id})">🗑️</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"><b>TOTAL LÍQUIDO NO PERÍODO</b></td>
                    <td colspan="2" style="font-weight:800; color:${total>=0?'var(--green)':'var(--red)'}" class="${state.hidden?'hidden-val':''}">
                        R$ ${total.toLocaleString()}
                    </td>
                </tr>
            </tfoot>
        </table>
    `;
}

function toggleSort(key) {
    if(state.sortKey === key) state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    else { state.sortKey = key; state.sortOrder = 'asc'; }
    render();
}

// Funções de apoio (Gráficos, Modal, etc) seguem a mesma lógica anterior...
// [Manter as funções de renderCharts, save, edit, del, toggleTheme, etc aqui]