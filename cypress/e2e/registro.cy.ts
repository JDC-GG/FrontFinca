describe('Registro de usuario', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/registro'); 
  });

 it('debería registrar un usuario nuevo correctamente', () => {
    cy.intercept('POST', '/usuario').as('registroRequest');

    cy.get('input[formControlName="nombre"]').type('Juan');
    cy.get('input[formControlName="apellido"]').type('Pérez');
    cy.get('input[formControlName="telefono"]').type('1234567890');
    cy.get('input[formControlName="email"]').type('juan.perez@example.com');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('select[formControlName="rol"]').select('ARRENDADOR');

    cy.get('button[type="submit"]').click();

    cy.wait('@registroRequest').its('response.statusCode').should('eq', 200);

    cy.on('window:alert', (text) => {
      expect(text).to.contains('¡Usuario registrado con éxito!');
    });
  });

  it('debería mostrar error cuando el correo ya existe', () => {
    cy.intercept('POST', '/usuario', {
      statusCode: 400,
      body: { message: 'El correo ya está registrado.' }
    }).as('registroRequest');

    cy.get('input[formControlName="nombre"]').type('Ana');
    cy.get('input[formControlName="apellido"]').type('Gómez');
    cy.get('input[formControlName="telefono"]').type('0987654321');
    cy.get('input[formControlName="email"]').type('correo.existente@example.com');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('select[formControlName="rol"]').select('ARRENDATARIO');

    cy.get('button[type="submit"]').click();

    cy.wait('@registroRequest');

    // Aquí verifica que el mensaje de error se muestre en el DOM
    cy.get('.error').should('contain.text', 'El correo ya está registrado.');
  });
});