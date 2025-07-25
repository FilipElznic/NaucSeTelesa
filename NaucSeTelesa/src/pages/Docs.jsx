import { useState } from "react";
import PropTypes from "prop-types";
import {
  BookOpen,
  Users,
  Download,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  FileText,
  Database,
  Shield,
  Globe,
  Terminal,
  Copy,
} from "lucide-react";
import "../App.css";

function Docs() {
  const [expandedSections, setExpandedSections] = useState({
    installation: true, // Open installation by default
  });

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const CodeBlock = ({ children, language = "bash" }) => (
    <div className="bg-black/50 rounded-lg p-4 my-4 relative group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase">{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(children)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white"
          title="Copy to clipboard"
        >
          <Copy size={16} />
        </button>
      </div>
      <pre className="text-sm text-green-400 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );

  CodeBlock.propTypes = {
    children: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  const TableOfContents = () => (
    <div className="usergradient rounded-xl p-6 shadow-lg mb-8">
      <h2 className="userlvl text-2xl font-semibold mb-4 flex items-center">
        <FileText className="mr-3" size={24} />
        Table of Contents
      </h2>
      <nav className="space-y-2">
        <a
          href="#installation"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          1. Installation & Setup
        </a>
        <a
          href="#supabase-config"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          2. Supabase Configuration
        </a>
        <a
          href="#running-app"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          3. Running the Application
        </a>
        <a
          href="#features"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          4. Features Overview
        </a>
        <a
          href="#user-guide"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          5. User Guide
        </a>
        <a
          href="#troubleshooting"
          className="block text-blue-400 hover:text-blue-300 transition-colors"
        >
          6. Troubleshooting
        </a>
      </nav>
    </div>
  );

  const ExpandableSection = ({ id, title, icon: Icon, children }) => (
    <div className="usergradient rounded-xl p-6 shadow-lg mb-6">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="userlvl text-2xl font-semibold flex items-center">
          <Icon className="mr-3" size={24} />
          {title}
        </h2>
        {expandedSections[id] ? (
          <ChevronDown size={24} />
        ) : (
          <ChevronRight size={24} />
        )}
      </button>
      {expandedSections[id] && <div className="mt-6 space-y-4">{children}</div>}
    </div>
  );

  ExpandableSection.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <div className="bg-transparent text-white min-h-screen p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col items-center">
      {/* Page Title */}
      <div className="flex w-full justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-8 sm:mb-12 pb-4 sm:pb-6">
          <span className="userlvl">Documentation</span>
        </h1>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-4 sm:mt-8">
        {/* Introduction */}
        <section className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-4 sm:mb-6">
            Welcome to NaucSeTelesa Documentation
          </h2>
          <p className="text-zinc-300 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            NaucSeTelesa (Learn Solids) is an interactive educational platform
            designed to help students learn about geometric solids through 3D
            visualizations, interactive tasks, and comprehensive learning
            materials. This documentation will guide you through installation,
            setup, and usage.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center bg-black/30 rounded-lg px-4 py-2">
              <Globe className="mr-2 text-blue-400" size={20} />
              <span>React + Vite</span>
            </div>
            <div className="flex items-center bg-black/30 rounded-lg px-4 py-2">
              <Database className="mr-2 text-green-400" size={20} />
              <span>Supabase Backend</span>
            </div>
            <div className="flex items-center bg-black/30 rounded-lg px-4 py-2">
              <Shield className="mr-2 text-purple-400" size={20} />
              <span>Secure Authentication</span>
            </div>
          </div>
        </section>

        <TableOfContents />

        {/* Installation & Setup */}
        <section id="installation">
          <ExpandableSection
            id="installation"
            title="Installation & Setup"
            icon={Download}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
                  <Terminal className="mr-2" size={20} />
                  1. Clone the Repository
                </h3>
                <CodeBlock>{`git clone https://github.com/FilipElznic/NaucSeTelesa.git
cd NaucSeTelesa`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  2. Install Dependencies
                </h3>
                <CodeBlock>{`npm install
# or
yarn install`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  3. Environment Setup
                </h3>
                <p className="text-gray-300 mb-3">
                  Create a{" "}
                  <code className="bg-black/30 px-2 py-1 rounded">.env</code>{" "}
                  file in the root directory:
                </p>
                <CodeBlock language="env">{`VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_public_key`}</CodeBlock>
              </div>
            </div>
          </ExpandableSection>
        </section>

        {/* Supabase Configuration */}
        <section id="supabase-config">
          <ExpandableSection
            id="supabase-config"
            title="Supabase Configuration"
            icon={Database}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  Step 1: Create Supabase Project
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>
                    Go to{" "}
                    <a
                      href="https://supabase.com"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Supabase
                    </a>
                  </li>
                  <li>Sign up/in and create a new project</li>
                  <li>
                    Wait for the project to be set up (usually 1-2 minutes)
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  Step 2: Get Project Credentials
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>Go to Project Settings → API</li>
                  <li>
                    Copy your:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>
                        <strong>Project URL</strong> (VITE_SUPABASE_URL)
                      </li>
                      <li>
                        <strong>Anon public key</strong> (VITE_SUPABASE_KEY)
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Step 3: Create Database
                </h3>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <p className="text-orange-300 mb-3">
                    <strong>Important:</strong> Database setup is required for
                    the application to work properly.
                  </p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>Go to public folder and find database.png</li>
                    <li>Create database same as in the picture</li>
                    <li>You will also need to setup RLS policies</li>
                  </ol>
                  <p className="text-sm text-gray-400 mt-3">
                    Note: You can&apos;t export supabase database with RLS
                    policies and data. The data needed for insert will be in
                    folder data in src.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-400 mb-3">
                  Step 4: Authentication Setup
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>Go to Authentication → Settings</li>
                  <li>
                    Configure sign-in providers:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>
                        <strong>Email:</strong> Enable email authentication
                      </li>
                    </ul>
                  </li>
                  <li>Set up email templates if needed</li>
                </ol>
              </div>
            </div>
          </ExpandableSection>
        </section>

        {/* Running the Application */}
        <section id="running-app">
          <ExpandableSection
            id="running-app"
            title="Running the Application"
            icon={Terminal}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  Development Mode
                </h3>
                <CodeBlock>{`npm run dev
# or
yarn dev`}</CodeBlock>
                <p className="text-gray-300">
                  The application will start on{" "}
                  <code className="bg-black/30 px-2 py-1 rounded">
                    http://localhost:5173
                  </code>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  Build for Production
                </h3>
                <CodeBlock>{`npm run build
# or
yarn build`}</CodeBlock>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Preview Production Build
                </h3>
                <CodeBlock>{`npm run preview
# or
yarn preview`}</CodeBlock>
              </div>
            </div>
          </ExpandableSection>
        </section>

        {/* Features Overview */}
        <section id="features">
          <ExpandableSection
            id="features"
            title="Features Overview"
            icon={BookOpen}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  3D Solid Visualizations
                </h3>
                <p className="text-gray-300 text-sm">
                  Interactive 3D models of geometric solids including cubes,
                  spheres, pyramids, cylinders, and more. Rotate and examine
                  each solid in detail.
                </p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Interactive Tasks
                </h3>
                <p className="text-gray-300 text-sm">
                  Solve problems related to volume, surface area, and properties
                  of geometric solids. Get instant feedback on your answers.
                </p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">
                  Progress Tracking
                </h3>
                <p className="text-gray-300 text-sm">
                  Monitor your learning progress with detailed statistics and
                  achievement tracking. Earn points for completing tasks.
                </p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">
                  Leaderboards
                </h3>
                <p className="text-gray-300 text-sm">
                  Compete with other students and see how you rank on the global
                  leaderboard. Challenge yourself to reach the top!
                </p>
              </div>
            </div>
          </ExpandableSection>
        </section>

        {/* User Guide */}
        <section id="user-guide">
          <ExpandableSection id="user-guide" title="User Guide" icon={Users}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  Navigation
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>
                    <strong>Home:</strong> Landing page with overview and quick
                    access
                  </li>
                  <li>
                    <strong>Solids:</strong> Browse and interact with 3D
                    geometric models
                  </li>
                  <li>
                    <strong>Tasks:</strong> Complete interactive exercises and
                    problems
                  </li>
                  <li>
                    <strong>Profile:</strong> View your progress, achievements,
                    and statistics
                  </li>
                  <li>
                    <strong>Help:</strong> Get assistance and find answers to
                    common questions
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">
                  Using the 3D Viewer
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Click and drag to rotate the solid</li>
                  <li>Use mouse wheel to zoom in/out</li>
                  <li>Click on different parts to see detailed information</li>
                  <li>Use the formula panel to see calculations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Completing Tasks
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Read the problem statement carefully</li>
                  <li>Use the provided measurements and formulas</li>
                  <li>Enter your answer in the designated field</li>
                  <li>Submit to get instant feedback and points</li>
                </ul>
              </div>
            </div>
          </ExpandableSection>
        </section>

        {/* Troubleshooting */}
        <section id="troubleshooting">
          <ExpandableSection
            id="troubleshooting"
            title="Troubleshooting"
            icon={HelpCircle}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3">
                  Common Issues
                </h3>

                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-400 mb-2">
                      Environment Variables Not Working
                    </h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Ensure .env file is in the root directory</li>
                      <li>Restart the development server after adding .env</li>
                      <li>Check that variables start with VITE_</li>
                      <li>Verify Supabase credentials are correct</li>
                    </ul>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">
                      Database Connection Issues
                    </h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Verify your Supabase project URL and key</li>
                      <li>Check if database tables are created correctly</li>
                      <li>Ensure RLS policies are set up properly</li>
                      <li>Verify authentication is configured</li>
                    </ul>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">
                      Build Errors
                    </h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Delete node_modules and reinstall dependencies</li>
                      <li>Clear your browser cache</li>
                      <li>Check for any missing environment variables</li>
                      <li>Ensure all required files are present</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ExpandableSection>
        </section>

        {/* Footer note */}
        <div className="usergradient rounded-xl p-6 shadow-lg mt-8 text-center">
          <p className="text-gray-300">
            This documentation covers installation, setup, and basic usage. For
            additional support, please check the repository issues or contact
            the development team.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Last updated: July 26, 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default Docs;
