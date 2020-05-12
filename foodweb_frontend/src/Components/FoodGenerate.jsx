import React from 'react'

export default ({ FoodLinks }) => {
    return (
        <section className="bg-light page-section" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Foods</h2>
              <h3 className="section-subheading text-muted">Enjoy today's meal</h3>
            </div>
          </div>
          <div className="row" >
            {
                FoodLinks && FoodLinks.map(({ title, caption }, index) => 
                  <div className="col-md-4 col-sm-6 portfolio-item" key={index}>
                    <a className="portfolio-link" data-toggle="modal" href="SingleRecipe">
                        <div className="portfolio-hover">
                            <div className="portfolio-hover-content">
                                <i className="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img className="img-fluid" src={ `https://unsplash.it/350/140/?${Math.floor(Math.random(0,100) * 100)}` } alt="portfolio_img" />
                    </a>
                    <div className="portfolio-caption">
                        <h4>{ title }</h4>
                        <p className="text-muted">{ caption }</p>
                  </div>
              </div>
                )
            }
          </div>
        </div>
      </section>
    )
}