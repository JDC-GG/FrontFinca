describe('Creación de Propiedad como Arrendador', () => {
  beforeEach(() => {
    // Interceptar login
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

    // Interceptar creación de propiedad
    cy.intercept('POST', '**/propiedad', {
      statusCode: 201,
      body: { mensaje: 'Propiedad creada exitosamente' }
    }).as('crearPropiedad');

    // Interceptar GET para mostrar la propiedad en la lista
    cy.intercept('GET', '**/propiedad', {
      statusCode: 200,
      body: [
        {
          id: 123,
          nombre: 'Finca Cypress',
          departamento: 'Cundinamarca',
          municipio: 'La Vega',
          descripcion: 'Una finca ideal para descansar en familia.',
          habitaciones: 4,
          banos: 3,
          mascotas: true,
          piscina: true,
          asador: true,
          valorNoche: 200000,
          tipoIngreso: 'CARRETERA_PRINCIPAL',
          status: 'ACTIVA',
          idUsuario: 1
        }
      ]
    }).as('listarPropiedades');

    // Login
    cy.visit('http://localhost:4200/login');
    cy.get('input[formControlName="correo"]').type('juan@example.com');
    cy.get('input[formControlName="contrasena"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/propiedades');

    // Ir al formulario
    cy.visit('http://localhost:4200/propiedades/nueva');
  });

  it('debería crear una propiedad y aparecer en la lista', () => {
    // Llenar formulario
    cy.get('#nombre').type('Finca Cypress');
    cy.get('#departamento').type('Cundinamarca');
    cy.get('#municipio').type('La Vega');
    cy.get('#descripcion').type('Una finca ideal para descansar en familia.');
    cy.get('#habitaciones').clear().type('4');
    cy.get('#banos').clear().type('3');
    cy.get('#valorNoche').clear().type('200000');
    cy.get('#tipoIngreso').select('CARRETERA_PRINCIPAL');
    cy.get('#status').select('ACTIVA');
    cy.get('#mascotas').check();
    cy.get('#piscina').check();
    cy.get('#asador').check();

    // Enviar formulario
    cy.get('form').submit();

    // Esperar creación
    cy.wait('@crearPropiedad');

    // Validar redirección
    cy.url().should('include', '/propiedades');

    // Validar que aparece en lista
    cy.wait('@listarPropiedades');
    cy.contains('Finca Cypress').should('be.visible');
    cy.contains('Cundinamarca, La Vega').should('be.visible');
    cy.contains('$200000').should('be.visible');
  });
});
