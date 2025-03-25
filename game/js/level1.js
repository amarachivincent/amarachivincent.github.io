 const gridSize = 10;
        const gameContainer = document.querySelector('.game-container');
        const scoreElement = document.querySelector('.score');
        const gameOverElement = document.querySelector('.game-over');

        let playerPosition = { x: 0, y: 4 };
        let score = 0;
        let gameOver = false;

        // Game grid with walls and coins
        const grid = [
            ['empty', 'empty', 'empty', 'empty', 'empty', 'coin', 'empty', 'empty', 'coin',    'empty'],
            ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall', 'coin', 'empty',   'empty'],
            ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall',  'wall', 'wall',    'empty'],
            ['empty', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall',  'empty'],
            ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',  'empty'],
            ['wall', 'empty',  'empty', 'empty', 'empty', 'empty', 'coin','empty', 'empty',  'empty'],
            ['wall',  'empty', 'empty', 'empty', 'coin', 'empty',  'wall', 'empty', 'empty',  'empty'],
            ['wall',  'empty', 'empty', 'empty', 'wall',  'wall',  'wall', 'empty', 'empty',  'empty'],
            ['wall',  'lava', 'lava',  'lava',  'lava',  'lava',  'lava',   'lava', 'lava',     'lava'],
            ['wall',  'lava',  'lava',  'lava',  'lava',  'lava',  'lava',   'lava', 'lava',     'lava'],
        ];

        // Initialize the game grid
        function createGrid() {
            gameContainer.innerHTML = '';  // Clear the grid
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    gameContainer.appendChild(cell);

                    if (grid[y][x] === 'wall') {
                        cell.classList.add('wall');
                    } else if(grid[y][x]==='lava'){
                        cell.classList.add('lava');
                    } else if (grid[y][x] === 'coin') {
                        const coin = document.createElement('div');
                        coin.classList.add('coin');
                        cell.appendChild(coin);
                    }
                }
            }
        }

        // Update the player's position on the grid
        function updatePlayerPosition() {
            const cells = document.querySelectorAll('.cell');
            const playerCell = cells[playerPosition.y * gridSize + playerPosition.x];
            const playerElement = document.createElement('div');
            playerElement.classList.add('player');
            playerCell.appendChild(playerElement);
        }

        // Check for Collision
        function checkCollision(cellContent,y,x){

            if (cellContent === 'wall') {
                return false;
            } else if(cellContent==='lava'){
                 
                endGame();
                return false;           
            }else if (cellContent === 'coin') {
                score += 1;
                scoreElement.textContent = `Score: ${score}`;
                    grid[y][x] = 'empty';  // Remove the coin      
            }
            
            return true;
        }
        // Move the player
        function movePlayer(direction) {
            if (gameOver) return;

            const newPosition = { ...playerPosition };
            let cellContent=null;
            switch(direction){
                case 'right':         
                if (playerPosition.x < gridSize - 1){    
                    cellContent = grid[newPosition.y][newPosition.x+1];         
                   if(checkCollision(cellContent,newPosition.y, newPosition.x+1)){
                       newPosition.x += 1;
                    };
                    }
                    break;
                    case 'left':        
                if (playerPosition.x > 0){             
                    cellContent = grid[newPosition.y][newPosition.x-1];
                   if(checkCollision(cellContent,newPosition.y, newPosition.x-1)){
                       newPosition.x -= 1;
                    };
                    }
                    break;
                    case 'down':

                if (playerPosition.y < gridSize - 1){     
                    cellContent = grid[playerPosition.y+1][playerPosition.x];        
                   if(checkCollision(cellContent,newPosition.y+1,newPosition.x)){
                       newPosition.y += 1;
                    };
                    }
                    break;
                    case 'up':    
                if (playerPosition.y > 0){   

                    cellContent = grid[newPosition.y-1][newPosition.x];          
                   if(checkCollision(cellContent,newPosition.y-1,newPosition.x)){
                       newPosition.y -= 1;
                    };
                    }
                    break;
                    
            }

            playerPosition = newPosition;
            renderGame();
        }

        // End the game
        function endGame() {
            gameOver = true;
            gameOverElement.style.display = 'block';
        }

        // Render the game (clear grid and re-render)
        function renderGame() {
            createGrid();
            updatePlayerPosition();
        }

        // Event listener for arrow keys
        document.addEventListener('keydown', (event) => {
            if (gameOver) return;

            switch (event.key) {
                case 'ArrowUp':
                    movePlayer('up');
                    break;
                case 'ArrowDown':
                    movePlayer('down');
                    break;
                case 'ArrowLeft':
                    movePlayer('left');
                    break;
                case 'ArrowRight':
                    movePlayer('right');
                    break;
            }
        });

        // Start the game
        renderGame();

   