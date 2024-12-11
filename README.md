# Department Management Application

## Overview

The Department Management Application is a web-based solution built with modern web development tools like Next.js and GraphQL. It allows users to manage departments, view detailed department information, and perform CRUD operations. The backend is powered by Apollo Server, while the frontend leverages React and Next.js for dynamic and static rendering.

---

## Features

### General Features

- Fetch and display all departments.
- View detailed information about a specific department, including sub-departments.
- Create, update, and delete departments and their sub-departments.

### Tech Stack

- **Frontend**: Next.js, React, Apollo Client.
- **Backend**: Apollo Server (GraphQL), Node.js.
- **Database**: PostgreSQL.
- **Styling**: Tailwind CSS.

---

## File Structure

```
.
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── loading.tsx
│   ├── department/
│       ├── DepartmentCard.tsx
├── lib/
│   ├── graphql/
│   │   ├── client.ts
│   │   ├── queries.ts
├── pages/
│   ├── departments/
│   │   ├── [id]/
│   │   │   ├── page.tsx
├── schema.gql
```

---

## GraphQL Schema

```graphql
# Query for fetching all departments
type Query {
  departments: [Department!]!
  department(id: Float!): Department!
}

# Mutation for department management
type Mutation {
  createDepartment(input: CreateDepartmentInput!): Department!
  updateDepartment(id: Float!, input: UpdateDepartmentInput!): Department!
  deleteDepartment(id: Float!): Department!
}

# Supporting Types
type Department {
  id: ID!
  name: String!
  subDepartments: [SubDepartment!]
}

type SubDepartment {
  id: ID!
  name: String!
}

input CreateDepartmentInput {
  name: String!
  subDepartments: [CreateSubDepartmentInput!]
}

input UpdateDepartmentInput {
  name: String!
  subDepartments: [SubDepartmentInput!]!
}
```

---

## API Documentation

### Queries

#### Fetch All Departments

```graphql
query GET_DEPARTMENTS {
  departments {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

#### Fetch Department by ID

```graphql
query GET_DEPARTMENT($id: Float!) {
  department(id: $id) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

### Mutations

#### Create a Department

```graphql
mutation CREATE_DEPARTMENT($input: CreateDepartmentInput!) {
  createDepartment(input: $input) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

#### Update a Department

```graphql
mutation UPDATE_DEPARTMENT($id: Float!, $input: UpdateDepartmentInput!) {
  updateDepartment(id: $id, input: $input) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

#### Delete a Department

```graphql
mutation DELETE_DEPARTMENT($id: Float!) {
  deleteDepartment(id: $id) {
    id
    name
  }
}
```

---

## Development Setup

### Prerequisites

1. Node.js and npm.
2. PostgreSQL Database.
3. GraphQL client (Postman or Apollo Studio for testing).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/tobidun/tactology-fe.git
   git clone https://github.com/tobidun/tactology-be.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access the Frontend at `https://tactology-fe.vercel.app`.
   Access the Backend at `https://tactology-be.onrender.com/graphql`

---

## Usage Examples

### Login User

```json
{
  "query": "mutation { login(username: \"username\", password: \"securePassword123\") }"
}
```

### Create Department

Note: Send auth token from the headers as it it required to create the department

```json
{
  "query": "mutation createDepartment($input: CreateDepartmentInput!) { createDepartment(input: $input) { id name subDepartments { id name } } }",
  "variables": {
    "input": {
      "name": "IT Department",
      "subDepartments": [{ "name": "Backend" }, { "name": "Frontend" }]
    }
  }
}
```

### Fetch All Departments (Postman Request)

```json
{
  "query": "query GetDepartments { departments { id name createdBy { id username } subDepartments { id name } } }"
}
```

### Fetch a Department by ID (Postman Request)

```json
{
  "query": "query department($id: Float!) { department(id: $id) { id name subDepartments { id name } } }",
  "variables": {
    "id": 7
  }
}
```

---

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Next.js Documentation
- Apollo GraphQL Documentation
- Tailwind CSS
