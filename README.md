# Blackfire Plugin for Lando

This plugin for [Lando.dev](https://lando.dev) gives you the ability to use
[Blackfire Profiler](https://blackfire.io) with your application.

Blackfire Profiler is a Software-as-a-Service tool which measures how your code 
consumes resources at run-time. It enables to find performance bottlenecks and 
understand the code's behavior. It can be used in development, test/staging and 
production (with no overhead for end-users).

Intuitive visualizations enable you to browse through your call stack, and review 
Wall-time, CPU time, I/O time, Memory, Network calls, HTTP requests and SQL queries 
usage.

This plugin provides the **Blackfire Agent**, the **Blackfire CLI Tool**, and
**[Blackfire Player](https://blackfire.io/player)**. 
Please refer to the Blackfire documentation for [more details on the Blackfire stack](https://blackfire.io/docs/reference-guide/faq#the-blackfire-stack).

The **Blackfire Agent** is a daemon processing the data collected by the Blackfire Probe, 
and sending it to the Blackfire servers. The Blackfire Probe is a language extension; 
it collects resources consumption metrics on profiled code.

The **Blackfire CLI Tool** provides a client with 2 main commands:

* An HTTP client wrapping cURL to [profile web based apps](https://blackfire.io/docs/cookbooks/profiling-http-via-cli);
* A client to [profile CLI Commands](https://blackfire.io/docs/cookbooks/profiling-cli).

**[Blackfire Player](https://blackfire.io/player)** is a powerful Web Crawling, 
Web Testing, and Web Scraper application.  It provides a nice DSL to crawl HTTP 
services, assert responses, and extract data from HTML/XML/JSON responses.

## Requirements

- [Signup or login to Blackfire.io](https://blackfire.io/signup)
- [Lando v3+](https://lando.dev/)

## Installation

- [Download and extract the archive of the latest version](https://github.com/blackfireio/lando-plugin/releases);
- Move the extracted `blackfire` folder to the Lando plugins folder:

```bash
mv blackfire ~/.lando/plugins/
```

> If the `plugins` directory doesn't exist, create it:
> ```bash
> mkdir -p ~/.lando/plugins
> ```

## Configuration

You may configure Blackfire within your Landofile, by setting a service:

```yaml
services:
  blackfire:
    type: blackfire
    server_id: <YOUR_BLACKFIRE_SERVER_ID>
    server_token: <YOUR_BLACKFIRE_SERVER_TOKEN>
    client_id: <YOUR_BLACKFIRE_CLIENT_ID>
    client_token: <YOUR_BLACKFIRE_CLIENT_TOKEN>
```

### Increasing The Log Level

If you need to increase the log level for the Blackfire Probe or Agent, you may
configure the `log_level` directive:

```yaml
services:
  blackfire:
    type: blackfire
    log_level: 4
```

Then run `lando rebuild`.
You can now check the logs:

```bash
# Blackfire agent log
lando logs -s blackfire

# Blackfire probe log, as part of the appserver ones
lando logs -s appserver
```

### Custom App Service name

By default, Lando main app service is called `appserver`.

If you decided to call it in a different way, you need to configure the `blackfire`
service:

```yaml
services:
  blackfire:
    type: blackfire
    app_service: my_app_service_name
```

## Known Limitations

- It only works with Debian-based application containers, which is the case for
  most Lando recipes;
- The probe is automatically installed in PHP application services. For Python,
  you need to install the PIP package and run use `blackfire-python` instead of
  `python`.
