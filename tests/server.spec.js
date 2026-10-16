
const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  // Test 1: GET /cafes devuelve status 200 y un arreglo con al menos un objeto
  test("GET /cafes devuelve un arreglo con al menos un cafe", async () => {
    const response = await request(server).get("/cafes");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(typeof response.body[0]).toBe("object");
  });

  // Test 2: DELETE /cafes/:id devuelve 404 si el cafe no existe
  test("DELETE /cafes/:id devuelve 404 para un id inexistente", async () => {
    const response = await request(server)
      .delete("/cafes/999999")
      .set("Authorization", "token-de-prueba");

    expect(response.status).toBe(404);
  });

  // Test 3: POST /cafes agrega un nuevo cafe y devuelve 201
  test("POST /cafes agrega un cafe nuevo", async () => {
    const nuevoCafe = {
      id: "test-cafe-001",
      nombre: "Cafe de prueba",
      precio: 3000,
      ingredientes: ["cafe"],
      img: "cafe.jpg",
    };

    const response = await request(server)
      .post("/cafes")
      .send(nuevoCafe);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: nuevoCafe.id }),
      ])
    );
  });

  // Test 4: PUT /cafes/:id devuelve 400 si los ids son diferentes
  test("PUT /cafes/:id devuelve 400 si los ids no coinciden", async () => {
    const cafeActualizado = {
      id: "otro-id",
      nombre: "Cafe actualizado",
    };

    const response = await request(server)
      .put("/cafes/1")
      .send(cafeActualizado);

    expect(response.status).toBe(400);
  });
});
