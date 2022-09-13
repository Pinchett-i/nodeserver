var express = require('express');
var router = express.Router();
var Company = require('../models/company')

router.get('/', function (request, response, next) {
  index(request, response)
});

router.get('/new', function (request, response, next) {
  response.render('companies/new', { title: 'New Company', layout: './layouts/application' });
});

router.post('/', (request, response) => {
  create(request, response)
})

router.get('/:id/edit', (request, response) => {
  edit(request, response)
})

router.get('/:id', (request, response) => {
  show(request, response)
})

router.post('/:id', (request, response) => {
  update(request, response)
})

router.get('/:id/delete', (request, response) => {
  destroy(request, response)
})

async function index(request, response) {
  let db = request.app.get('db')
  let companies = await Company.all(db)
  
  response.render('companies/index', { title: 'Companies', layout: './layouts/application', companies: companies });
}

async function create(request, response) {
  try {
  let db = request.app.get('db')
  let name = request.body.company_name;

  let company = await Company.create(
    db,
    {
      name: name
    }
  )
  request.flash("success", `${company.attributes.name} successfully created`)
  response.redirect('/companies');
  }
  catch (e) {
    if (e === 'CreateFailed') {
      request.flash("error", "Could not create company")
      response.redirect('/companies')
    }
  }
}

async function edit(request, response) {
  try {
    let db = request.app.get('db')
    let id = request.params.id
    let company = await Company.find(db,
      {
        id: id
      })

    response.render('companies/edit', { title: `Edit ${company.attributes.name}`, layout: './layouts/application', company: company });

  }
  catch (e) {
    if (e === 'FindFailed') {
      request.flash("error", "Company not found")
      response.redirect('/companies')
    }
  }
}

async function update(request, response) {
  let id = request.params.id
  try {
    let db = request.app.get('db')

    let company = await Company.find(db,
      {
        id: id
      })

    await company.update(db,
      {
        name: request.body.company_name
      }
    )
    request.flash("success", "Company successfully updated")
    response.redirect('/companies')
  }
  catch (e) {
    if (e === 'FindFailed') {
      request.flash("error", "Company not Found")
      response.redirect('/companies')
    } else if (e === 'UpdateFailed') {
      request.flash("error", "Error trying to update Company")
      response.redirect(`/companies/${id}/edit`)
    }
  }
}

async function destroy(request, response) {
  try {
    let db = request.app.get('db')
    let id = request.params.id

    let company = await Company.find(db,
      {
        id: id
      })

    await company.destroy(db,
      [id]
    )
    request.flash("success", "Company successfully deleted")
    response.redirect('/companies')
  }
  catch (e) {
    if (e === 'FindFailed') {
      request.flash("error", "Company not Found")
      response.redirect('/companies')
    } else if (e === 'DestroyFailed') {
      request.flash("error", "Error trying to destroy Company")
      response.redirect(`/companies`)
    }
  }
}

async function show(request, response) {
  try {
    let db = request.app.get('db')
    let id = request.params.id
    let company = await Company.find(db,
      {
        id: id
      })

    response.render('companies/show', { title: `${company.attributes.name}`, layout: './layouts/application', company: company });

  }
  catch (e) {
    if (e == 'FindFailed') {
      request.flash("error", "Company doesn't exist")
      response.redirect('/companies')
    }
  }
}


module.exports = router;
