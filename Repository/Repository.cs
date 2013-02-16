using System;
using System.Workflow.Activities.Rules;
using System.Workflow.ComponentModel.Serialization;
using System.Xml;

namespace Repository
{
	public class FileRepository
	{
		public RuleSet Load(string filename) {
			XmlTextReader reader = new XmlTextReader(filename);
			WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
			object results = serializer.Deserialize(reader);
			RuleSet ruleset = (RuleSet)results;

			if (ruleset == null) {
				Console.WriteLine("The rules file " + filename + " does not appear to contain a valid ruleset.");
			}
			return ruleset;
		}

		public void Save(RuleSet ruleset, string filename) {
			XmlTextWriter writer = new XmlTextWriter(filename, null);
			WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
			serializer.Serialize(writer, ruleset);
			Console.WriteLine("Wrote rules file: " + filename);
		}
	}
}
