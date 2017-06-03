<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.4/sweetalert2.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.4/sweetalert2.min.css">

<script>
  const hash = window.location.hash;
  if (hash === '#success') {
    swal(
      "Success",
      "Thanks for installing Sbotify in your team!",
      "success"
    );
  } else if (hash === '#failure') {
    swal(
      "Oops!",
      "I'm sorry, something went wrong… please try again, and if this persists, send me an email to me@a-rmz.io",
      "error"
    );
  }
</script>

# Sbotify!
An easy way to share music with your team. 🎶

## Add it to slack!
<a href="https://slack.com/oauth/authorize?&scope=commands,bot,chat:write:bot&client_id=187076757827.188860129170&redirect_uri=https://c557f018.ngrok.io/slack/auth"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

Ez-pz, right?

You might be wondering: what will this app do with my great Slack team? Well, fear no more, because this is what will happen.
* A slash command will be added.
  * You can call the app by doing `/sbotify`.
* A bot user (`@sbotify`) will be added.

# Support
If you have any question or concern, send me an [email](mailto:armzprz+sbotify+support@gmail.com).

# Privacy Policy
This project is just made for fun. The only data kept is the id, name and token of your team, so we can provide you the best experience.
