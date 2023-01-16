<h1 align="center">
  Talus-Gatsby-Starter
</h1>

## 🚀 Quick start

1.  **Check Gatsby CLI configuration**

    To be compatible with our CCI build scripts, Gatsby CLI should use `yarn`:

    `~/.config/gatsby/config.json` should include:

    ```json
    "cli": {
      "packageManager": "yarn"
    }
    ```

2.  **Create a Gatsby site.**

    Clone this repository into the same directory (folder) where you want your new site to be.

    In that same directory, use the Gatsby CLI to create a new site, using this command:

    ```shell
    # create a new Gatsby site using the talus starter
    gatsby new [project-name] ./talus-gatsby-starter
    ```

    If you want to put your new site in a different directory from where you cloned `talus-gatsby-starter`, you will need to give the `gatsby new` command the path to `talus-gatsby-starter`.

3.  **Set up GitHub Repository**

    First, create a new empty repository for your project in Github. Make sure to copy the remote origin url (should be something like `https://github.com/talus-analytics-bus/awesome-repo-name.git`).

    Then, execute the included `setup-repo.sh` script to initialize a git repo with the continuous integration and deployment branches configured to match the CCI config. When prompted for the `Github URL for remote origin:`, provide the remote origin url for your repo that you copied.

    ```shell
    ./setup-repo.sh
    ```

4.  **Clone the example airtable**

    Clone the [example airtable base](https://airtable.com/apptYPkeoCz0lSn19/tblJV3LL08O5wNAHP/viwDPkxCqsqCF0nVi?blocks=hide) at this link
    or the one on the starter page, and update the `baseId` in `gatsby-config.js` to the new, project-specific airtable base. You may get
    warnings about missing content because of the content used for the starter home page.

5.  **Update `gatsby-config.ts`.**

    `gatsby-config.ts` will automatically configure opt-in analytics, cookieconsent, and airtable connections based on the values provided.

6.  **Build AWS Stack**

    In the `/CloudFormation/` directory, update all project specific names and tags in the `deploy-stack.sh`, `update-stack.sh`, scripts, and
    update site-specific passwords in the `build-stack.yaml` inside `authObject` on line 160. Do not commit these passwords to github, but commit all other template and
    script changes. These scripts serve as a record for the exact values used for deployment, updating, and tagging CloudFormation stacks.

    After updating both scripts, run `deploy-stack.sh` to build the site deployments:

    ```shell
    `CloudFormation/deploy-stack.sh`
    ```

    When any changes are made in the template, such as migrating the site off of the `talusanalytics.com` root domain, changes should be made
    using the `update-stack` script.

    ```shell
    `CloudFormation/update-stack.sh`
    ```

7.  **Update CCI Configuration**

    The "Outputs" tab of the CloudFormation stack will contain the distribution IDs and bucket names which should be used in `/.circleci/config.yml`.

    In the CircleCI Dashboard, create a trigger to build the `staging` daily during active development, and change to weekly when the project enters the maintenance phase.

# Sample Project Readme Template

<h1 align="center">
  Project Name
</h1>

## 📈 Analytics

- [Plausible Dashboard](#)
- [Google Search Console](#)
- [Google Analytics](#)

## 🚀 Deployment Status

| Branch  | CI/CD Status                      | Url                                         |
| ------- | --------------------------------- | ------------------------------------------- |
| Prod    | [Create CI/CD Badges in CircleCI] | [prod-projectname.talusanalytics.com](#)    |
| Staging | [Create CI/CD Badges in CircleCI] | [staging-projectname.talusanalytics.com](#) |
| Review  | [Create CI/CD Badges in CircleCI] | [review-projectname.talusanalytics.com](#)  |
| Dev     | [Create CI/CD Badges in CircleCI] | [dev-projectname.talusanalytics.com](#)     |

Automated deployment schedule: all data are ingested to `Staging` weekly.

## 📄 Ingest Latest Data from Airtable

1. Click the "CI/CD Status" badge above next to the site where you want to update data
2. Click "Trigger Pipeline" button on the top right section of that page.

## 👩‍💻 Local Development Quick start

1. [Install](https://bit.dev/docs/getting-started/installing-bit/installing-bit) & [log in](https://bit.dev/reference/reference/cli-reference/#login) to Bit

2. Install dependencies

```
yarn
```

3. Start development server

```
yarn start
```

## 🖥 Deployment Infrastructure

All Biosecurity Central Infrastructure is managed using the CloudFormation template within
the `/CloudFormation/` directory. All changes to hosting, domain names, alternate domain
names, and access control must be made in the template and deployed using the update script.

Infrastructure updates must be made with care as they can cause site downtime.

Remember to update site passwords before running deployment command, and do not commit site passwords to git.
