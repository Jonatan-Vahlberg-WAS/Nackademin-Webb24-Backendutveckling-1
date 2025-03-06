#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting CRUD test sequence...${NC}\n"

# 1. Create a new item (POST)
echo -e "${GREEN}1. Creating a new item...${NC}"
CREATE_RESPONSE=$(curl -s -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "test",
    "price": 99.99
  }')

# Extract the ID from the response
ITEM_ID=$(echo $CREATE_RESPONSE | grep -o '"id":[0-9]*' | cut -d':' -f2)

echo "Created item with ID: $ITEM_ID"
echo "Response: $CREATE_RESPONSE"
echo "----------------------------------------"

# 2. Read all items (GET)
echo -e "\n${GREEN}2. Reading all items...${NC}"
curl -s http://localhost:3000/items | json_pp
echo "----------------------------------------"

# 3. Read specific item (GET by ID)
echo -e "\n${GREEN}3. Reading item with ID: $ITEM_ID${NC}"
curl -s http://localhost:3000/items/$ITEM_ID | json_pp
echo "----------------------------------------"

# 4. Update the item (PUT)
echo -e "\n${GREEN}4. Updating item with ID: $ITEM_ID${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT http://localhost:3000/items/$ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Product",
    "category": "test",
    "price": 149.99
  }')
echo "Response: $UPDATE_RESPONSE"
echo "----------------------------------------"

# 5. Read updated item (GET by ID)
echo -e "\n${GREEN}5. Reading updated item...${NC}"
curl -s http://localhost:3000/items/$ITEM_ID | json_pp
echo "----------------------------------------"

# 6. Delete the item (DELETE)
echo -e "\n${GREEN}6. Deleting item with ID: $ITEM_ID${NC}"
curl -s -X DELETE http://localhost:3000/items/$ITEM_ID
echo "----------------------------------------"

# 7. Verify deletion (GET by ID)
echo -e "\n${GREEN}7. Verifying deletion...${NC}"
curl -s http://localhost:3000/items/$ITEM_ID | json_pp
echo "----------------------------------------"

echo -e "\n${BLUE}CRUD test sequence completed!${NC}" 