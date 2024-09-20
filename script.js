const PLANCK = 6.62607015e-34; // Constante de Planck
const PHI = 1.61803398875;     // Proporção Áurea

// Dicas metafóricas relacionadas ao enigma de 3-6-9, Proporção Áurea e Fibonacci
const hints = [
    'O universo é como uma espiral que cresce de uma pequena semente — Fibonacci te guiará.',
    'Há um fluxo invisível que conecta tudo: energia, vibração e frequência.',
    'Se você apenas conhecesse o esplendor do 3, 6 e 9, teria a chave do universo.',
    'Pense em um círculo perfeito — divida-o e encontrará o padrão que revela o todo.',
    'O que começa com 1 e cresce em 1 cria um caminho, mas o caminho certo começa com 3.',
    'Se 1 é o começo e 2 é o caminho, 3 é a força que transcende — olhe para as três dimensões.',
    'Os números 3, 6 e 9 giram como guardiões, enquanto os outros permanecem fixos.'
];

// Variáveis globais para controlar a exibição das dicas
let hintCount = 0;
let currentHint = -1;

// Seleção de elementos do DOM
const hintButton = document.getElementById('hintButton');
const backHintButton = document.getElementById('backHintButton');
const messageElement = document.getElementById('message');

// Evento para Obter a Próxima Dica
hintButton.addEventListener('click', () => {
    if (hintCount < hints.length) {
        messageElement.textContent = hints[hintCount];
        hintCount++;
        currentHint = hintCount - 1;

        // Exibe o botão para voltar à dica anterior, se necessário
        if (hintCount > 0) {
            backHintButton.style.display = 'inline-block';
        }
    } else {
        messageElement.textContent = 'Você já visualizou todas as dicas.';
    }
});

// Evento para Voltar à Dica Anterior
backHintButton.addEventListener('click', () => {
    if (currentHint > 0) {
        currentHint--;
        hintCount = currentHint + 1;
        messageElement.textContent = hints[currentHint];

        // Esconde o botão de voltar se estiver na primeira dica
        if (currentHint === 0) {
            backHintButton.style.display = 'none';
        }
    }
});

// Adiciona evento ao botão de iniciar a sequência quântica
document.getElementById('initiateButton').addEventListener('click', () => {
    document.getElementById('cipherSection').style.display = 'block';
    document.getElementById('initiateButton').style.display = 'none';
    messageElement.textContent = 'Sequência iniciada. Insira o código para prosseguir.';
    initializeQuantumAnimation();
});

// Função para inicializar a animação do fluxo toroidal
function initializeQuantumAnimation() {
    const canvas = document.getElementById('quantumCanvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Adicionando luzes
    const light = new THREE.AmbientLight(0x00ff00, 1);
    scene.add(light);

    // Criando o torus (fluxo toroidal)
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Configurando as partículas de energia
    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const colors = [];

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const radius = 15;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);

        positions.push(x, y, z);
        velocities.push(Math.random() * 0.02);

        const color = new THREE.Color(0x00ff00);
        colors.push(color.r, color.g, color.b);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 40;

    // Função de animação
    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;

        const positions = particles.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const speed = velocities[i];
            positions[ix] += speed;
            positions[iy] += speed;
            positions[iz] += speed;

            if (positions[ix] > 20 || positions[ix] < -20) positions[ix] *= -1;
            if (positions[iy] > 20 || positions[iy] < -20) positions[iy] *= -1;
            if (positions[iz] > 20 || positions[iz] < -20) positions[iz] *= -1;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }

    animate();
}
