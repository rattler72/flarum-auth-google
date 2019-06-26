import { extend, override } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';
import LogInModal from 'flarum/components/LogInModal';

app.initializers.add('saleksin-auth-google', () => {
  extend(LogInButtons.prototype, 'items', function(items) {
    console.log('Login items...');
    console.log(items);
    items.add('google',
      <LogInButton
        className="Button LogInButton--nnd"
        icon="nnd-btn fab fa-google"
        path="/auth/google">
        {app.translator.trans('saleksin-auth-google.forum.log_in.with_google_button')}
      </LogInButton>
    );
  });

  LogInModal.prototype.me = function(){ return this; }

  override(LogInModal.prototype, 'body', (original) => {
      console.log('Body overriding...');
      const og = original();
      console.log(og);
      console.log(this);
      return [
        <LogInButtons/>,
      ];
  });

  override(LogInModal.prototype, 'footer', (original) => {
      console.log('Body overriding...');
      const og = original();
      console.log(og);
      return [
        <p className="LogInModal-signUp">
          {app.translator.trans('saleksin-auth-google.forum.log_in.footer')}
        </p>
      ];
  });

});
