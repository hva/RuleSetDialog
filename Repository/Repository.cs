using System;
using System.Workflow.Activities.Rules;
using System.Workflow.ComponentModel.Serialization;
using System.Xml;

namespace Repository
{
	public class FileRepository
	{
		private const string Filename = "Test.rules.xml";

		public RuleSet Load() {
			XmlTextReader reader = new XmlTextReader(Filename);
			WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
			object results = serializer.Deserialize(reader);
			RuleSet ruleset = (RuleSet)results;

			if (ruleset == null) {
				Console.WriteLine("The rules file " + Filename + " does not appear to contain a valid ruleset.");
			}
			return ruleset;
		}

		public void Save(RuleSet ruleset) {
			XmlTextWriter writer = new XmlTextWriter(Filename, null);
			WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
			serializer.Serialize(writer, ruleset);
			Console.WriteLine("Wrote rules file: " + Filename);
		}
	}
}
