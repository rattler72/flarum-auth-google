import { extend, override } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import LogInModal from 'flarum/components/LogInModal';
import AdminLoginPage from './components/AdminLoginPage';

app.initializers.add('saleksin-auth-google', () => {
  extend(LogInButtons.prototype, 'items', function(items) {
    items.add('google',
      <LogInButton
        className="Button LogInButton--nnd"
        icon="nnd-btn fab fa-google"
        path="/auth/google">
        {app.translator.trans('saleksin-auth-google.forum.log_in.with_google_button')}
      </LogInButton>
    );
  });

  override(LogInModal.prototype, 'body', (original) => {
      return [
        <LogInButtons/>,
      ];
  });

  override(LogInModal.prototype, 'footer', (original) => {
      return [
        <p className="LogInModal-signUp">
          {app.translator.trans('saleksin-auth-google.forum.log_in.footer')}
        </p>
      ];
  });

  // this is just for the admin login
  app.routes['auth.login.admin'] = {path: '/auth/login/admin', component: AdminLoginPage.component()};

});
