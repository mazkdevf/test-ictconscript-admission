# ICT Conscript Admission Test

## Project Overview

This project, "Unit Logbook," is a frontend application developed as part of the ICT Conscript Admission Test. The aim was to build a simple, browser app to enhance situational awareness within a platoon by providing a digital logbook for daily events.

**Development Time:** This project was completed within approximately 1.5 to 2 hours of focused work. (UI/UX, Development, Data-analysis)

**Project Initiation:** The repository was forked around July 7-9th, 2025.

**Development Context:** The development of this prototype was undertaken during personal free time while on duty. There was a slight delay in commencing work due to the administrative process of securing approval for necessary equipment (Laptop).

The Deployed version of the source can be found at "https://mazkdevf.github.io/test-ictconscript-admission/" if it says that the sample data is not found please refresh page using force refresh CTRL + SHIFT + R !!!

The Compiled version is in "gh-pages" branch!

### How to Build and Run the Web Application (Next.js)

To set up and run this Next.js application locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mazkdevf/test-ictconscript-admission.git
    cd test-ictconscript-admission
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build the application for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will create an `out` directory containing the static build of the application, suitable for deployment to platforms like GitHub Pages.


5. **Entries File Not Opening in Development?**
   - In the file **"/lib/services/log-entry-service.ts"**, update line 13 as follows:
```diff
-      const response = await fetch("/test-ictconscript-admission/sample-data/entries.json")
+      const response = await fetch("/sample-data/entries.json")
```
---

# 1. What we are looking for?

We’re looking for individuals who are eager to grow and contribute in the following roles:

1.  **Software Developer** - Backend/API development, Identity Provider integrations (IdPs), frontend development (web or mobile)
2.  **Devops/Infra Developer** - Cloud platforms, Infrastructure-as-Code (e.g., Terraform), automation and CI/CD pipelines (e.g., GitHub Actions), platform operations
3.  **PX/Product Designer** - User experience design, wireframing, user communication, early product scoping
4.  **Product Owner/Scrum Master** - Supporting development teams through leadership and operational coordination. Responsibilities may include: stakeholder management, backlog prioritization, customer satisfaction, and team rituals

# 2. How do I perform the Admission Test?

The process is straightforward: choose a task, fork the repository, complete your work, and submit it. Follow the steps below carefully:

### 1. Tasks are located in the **/challenges folder**.

-   All tasks are located in the /challenges folder.
-   Pick the task that interests you the most.
    ✅ You only need to complete one task—not all of them.
    . Each task will be assessed independently (per-task assessment).
    🔄 Completing multiple tasks does not necessarily improve your standing. We are selecting people for different roles, not based on volume.

### 3. Fork the repo (IMPORTANT) & Do!

-   Fork this repository to your GitHub account (e.g., `https://github.com/yourusername/test-ictadmission`).
-   Complete your selected task(s) directly in the forked repository.
-   If your work includes external content (e.g., Figma, slides, diagrams), link everything clearly in your fork’s README.md.
-   Ensure that your forked repository is public, so we can access it without issues.

📝 For UX Designers (Type 3) or Product Owners/Scrum Masters (Type 4):
Make sure to link all deliverables (e.g., wireframes, research notes, plans) in your README.md.

### 4. Submit your Admission Test

Once your test is ready, send an email to: `ictvmhaku.pvjjk (at) mil.fi`
Include the following in your message:

-   Your full name
-   A link to your forked, public GitHub repository
-   See the format below, use that!

⚠️ All other documentation should already be in your repository. Do not include additional details in the email.

**You can return an incomplete Test** (a task that fails to fulfill the given goals) **as well. If you do so, please detail in your email why you couldn't complete the task.**

### 5. Await pre-selection results

After submitting your test:

-   We will evaluate your work.
-   Based on both your OmaIntti application and Admission Test, if applicable, we’ll decide if you move to the interview stage.

You will be notified if you are selected for an interview.

Final selections are made after all interviews are completed.

## 3 Format of mail to return your Test

```

Mailto: ictvmrekry.pvjjk at mil.fi
Subject: Your Surname/ICT-varusmieshaun valintatehtävä suoritettu

Hei!

Olen aloittanut palvelukseni saapumiserässä II/25 ja olen hakenut OmaIntti.fi:ssä ICT-varusmieheksi.

Suoritin ohessa seuraavan valintatehtävän:

  - 01a-swdev-front
  - (listaa, jos teit useamman tehtävän)

Tehtävä on tarkastettavissa täällä:
[https://github.com/(your](https://github.com/(your) github user)/your-repository

OmaNimi

```

Make sure to follow the return instructions closely.

### Thank you!

- The ICT Conscript Program team
