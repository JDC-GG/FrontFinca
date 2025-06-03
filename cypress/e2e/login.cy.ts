describe('LoginComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('debería redirigir al arrendador tras login exitoso', () => {
    // Interceptamos el POST /login y devolvemos un usuario con rol ARRENDADOR
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: 'fake-token',
        usuario: {
          id: 1,
          nombre: 'Juan',
          rol: 'ARRENDADOR'
        }
      }
    }).as('loginRequest');

    cy.get('input[formControlName="correo"]').type('juan@example.com');
    cy.get('input[formControlName="contrasena"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/propiedades');
  });

  it('debería redirigir al arrendatario tras login exitoso', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        token: 'fake-token',
        usuario: {
          id: 2,
          nombre: 'María',
          rol: 'ARRENDATARIO'
        }
      }
    }).as('loginRequest');

    cy.get('input[formControlName="correo"]').type('maria@example.com');
    cy.get('input[formControlName="contrasena"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/arriendos');
  });

  it('debería mostrar error con credenciales inválidas', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        mensaje: 'Credenciales inválidas'
      }
    }).as('loginRequest');

    cy.get('input[formControlName="correo"]').type('mal@example.com');
    cy.get('input[formControlName="contrasena"]').type('incorrecto');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.contains('Credenciales inválidas').should('be.visible');
  });
});