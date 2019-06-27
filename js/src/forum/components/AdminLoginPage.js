import LogInModal from 'flarum/components/LogInModal';

/**
 * The `AdminLoginPage` component shows post which user Mentioned at
 */
export default class AdminLoginPage extends LogInModal {
    init() {
        super.init();
    }

    className() {
      return 'AdminLoginPage Modal--large';
    }

    title() {
      return app.translator.trans('saleksin-auth-google.forum.log_in.admin_form')
    }

    body() {
      return [
        <div className="Form Form--centered">
          {this.fields().toArray()}
        </div>
      ];
    }

    onsubmit(e) {
      e.preventDefault();

      this.loading = true;

      const identification = this.identification();
      const password = this.password();
      const remember = this.remember();

      app.session.login({identification, password, remember}, {errorHandler: this.onerror.bind(this)})
        .then(
          () => window.location.href="/",
          this.loaded.bind(this)
        );
    }
}
