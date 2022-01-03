This project is intended only for the purpose of studying and it's proposed by Harvard University for accreditation a verified certificate from edX for their CS50's course.

To run this project you need to follow the required steps:

	0. Open command prompt or short cmd.exe
	1. Install Python version 3.8 or above
	2. Install Virtual environment: pip install virtualenv
	3. Create Virtual environment: virtualenv <evnname>
	4. Activate the Virtual environment:
			- Mac OS / Linux: source <evnname>/bin/activate
			- Windows: <evnname>\Scripts\activate
	5. Run pip install -r "requiremetns.txt/<Or place the whole path to the location of the requiremetns file.>"
	6. Run python manage.py makemigrations auctions
	7. Run python manage.py migrate
	8. Run python manage.py runsever
	9. After running the above command a text will be printed saying:
			
			"Django version 4.0, using settings 'commerce.settings'
			Starting development server at http://127.0.0.1:8000/
			Quit the server with CTRL-BREAK "
		
	   Copy the http link "http://127.0.0.1:8000/" and past it in a browser and hit enter.
	

After completing all of the above steps you'll successfully run this Django commerce project.