import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const backend_url = "https://vbackend.yashtyagi.in"
const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get the current user from Clerk
  const [form, setForm] = useState({
    name: user ? user.fullName || user.username || user.emailAddresses[0].emailAddress : '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(`${backend_url}/api/v1/imgGenerate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please Provide a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(`${backend_url}/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <>
      <SignedIn>
        <section className="max-w-7xl mx-auto">
          <div className="justify-center text-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              Create <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">AI</mark> Images
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Unleash the power of our AI model from Hugging Face to turn your wildest ideas into stunning visual creations. Share your imagination with the community and bring your dreams to life!
            </p>
          </div>

          <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="Yash Tyagi"
                value={form.name}
                handleChange={handleChange}
              />

              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="A Bollywood dance party with dancers in vibrant traditional attire...."
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />

              <div className="relative bg-gradient-to-b from-[#E2E8F0] to-[#F0F4F8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-40 rounded-lg">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-9/12 h-9/12 object-contain"
                    />
                  </div>
                )}

                {generatingImg && (
                  <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex gap-5">
              <button
                type="button"
                onClick={generateImage}
                className={`text-white bg-gradient-to-r from-[#4CAF50] to-[#45A249] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center focus:outline-none transition-all duration-300 ${generatingImg ? 'cursor-not-allowed opacity-70' : 'hover:opacity-90'}`}
                disabled={generatingImg}
              >
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
            </div>

            <div className="mt-10">
              <p className="mt-2 text-[#666e75] text-[14px]">
                <strong>Ready to showcase your creation?</strong> Share your imaginative image with the community!
              </p>
              <button
                type="submit"
                className={`mt-4 text-white bg-gradient-to-r from-[#3B82F6] to-[#2563EB] font-medium rounded-md text-sm w-full sm:w-auto px-6 py-3 focus:outline-none transition-all duration-300 hover:opacity-90 transform hover:scale-105`}
                disabled={loading}
              >
                {loading ? 'Sharing...' : 'Share with the Community'}
              </button>
            </div>
          </form>
        </section>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default CreatePost;