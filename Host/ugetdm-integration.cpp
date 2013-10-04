#include <iostream>
#include <cstdlib>
#include <string>

#ifdef OS_WINDOWS
#include <windows.h>
#endif

#define APPLICATION_KEY "application"
#define PARAMETERS_KEY "parameters"

#define SAMPLE "{\"application\":\"/usr/local/bin/wget\",\"parameters\":\" 'http://ftp.gnu.org/gnu/wget/wget-1.7.1.tar.gz' -P '/tmp' \"}"

typedef struct
{
	std::string application,
		        parameters;
} CALL;

int32_t readMessageLength()
{
	int32_t length;

	size_t result = fread(&length, sizeof(length), 1, stdin);
	if (result != 1)
	{
		perror("Could not read header.");
	 	exit(EXIT_FAILURE);
	}

	return length;
}

char * readMessage(const unsigned int &n)
{
	char *message = new char[n];

	size_t result = fread(message, 1, n, stdin);
	if (result != n)
	{
		perror("Could not read message.");
	 	exit(EXIT_FAILURE);
	}

	return message;
}

CALL * parseMessage(char *message, const unsigned int &n)
{
	CALL *call = new CALL;

	bool insideJson = false,
		 insideQuotes = false,
		 waitingKey = false,
		 waitingValue = false,
  		 foundApplication = false,
		 foundParameters = false;

	char *token = new char[n + 1];

	int tokenLength = 0;

	for (unsigned int i = 0; i < n; i++)
	{
		if (!insideJson && message[i] == '{')
			insideJson = waitingKey = true;
		else if (insideJson && message[i] == '}')
			insideJson = false;
		else if (insideJson && !insideQuotes && !waitingValue && message[i] == ':')
			waitingValue = true;
		else if (insideJson && !insideQuotes && !waitingKey && message[i] == ',')
			waitingKey = true;
		else if (insideJson && message[i] == '"' && (i == 0 || (i > 0 &&  message[i - 1] != '\\' ))) 
		{
			insideQuotes = !insideQuotes;

			if (insideQuotes)
				tokenLength = 0;
			else
			{
				// making sure to limit the string length
				token[tokenLength] = '\0';

				if (waitingKey)
				{
					if (strcmp(token, APPLICATION_KEY) == 0)
						foundApplication = true;
					else if (strcmp(token, PARAMETERS_KEY) == 0)
						foundParameters = true;
					else
						return NULL;
					waitingKey = false;
				}
				else
				{
					if (waitingValue)
					{

						if (foundApplication)
							call->application = token;
						else if (foundParameters)
							call->parameters = token;
						else
							return NULL;
						foundApplication = foundParameters = waitingValue = false;
					}
					else
						return NULL;
				}
			}
		}
		else if (insideJson && insideQuotes)
			token[tokenLength++] = message[i];
		else if (message[i] != ' ' && message[i] != '\n' && message[i] != '\r' && message[i] != '\t')
			return NULL;
	}

	delete token;

	// should return a valid struct or nothing
	if (call->application.length() == 0 || call->parameters.length() == 0)
	 	return NULL;

	return call;
}

void callApplication(const CALL *call)
{
	#ifdef OS_WINDOWS
		STARTUPINFO StartInfo;                     // name structure
		PROCESS_INFORMATION ProcInfo;              // name structure
		memset(&ProcInfo, 0, sizeof(ProcInfo));    // Set up memory block
		memset(&StartInfo, 0 , sizeof(StartInfo)); // Set up memory block
		StartInfo.cb = sizeof(StartInfo);          // Set structure size
		parameters = " " + parameters;
		CreateProcess((char *) call->application.c_str(), (char *) call->parameters.c_str(), NULL, NULL, NULL, NULL, NULL, NULL, &StartInfo, &ProcInfo);
	#endif

	#if defined OS_LINUX || defined OS_MACOSX
		system((call->application + " " + call->parameters + " &").c_str());
	#endif
}

int main (void)
{
	const unsigned int messageLength = readMessageLength();
	char *message = readMessage(messageLength);

	CALL *call = parseMessage(message, messageLength);
	//CALL *call = parseMessage((char *) SAMPLE, strlen(SAMPLE));

	if (call != NULL)
	{
		std::string cmd = (call->application + " " + call->parameters + " &");
		callApplication(call);
		delete call;
	}

	delete message;

	exit(EXIT_SUCCESS);
}